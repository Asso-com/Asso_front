import { Box, Text, VStack, Skeleton } from "@chakra-ui/react";
import { GoogleMap, LoadScript, Marker, Polygon } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  center,
  containerStyle,
  mapOptions,
  qpvPolygonOptions,
  villeneuveCoords,
  villeneuvePolygonOptions,
} from "../constants/mapOptions";
import type { ProcessedStudentData } from "../Types/StudentLocationType";
import qpvGeoJsonData from "../constants/qp-politiquedelaville-shp.json";
import { createLocationMarker } from "../utils";

interface MapComponentProps {
  filteredStudents: ProcessedStudentData[];
}

type LatLngLiteral = google.maps.LatLngLiteral;

interface GeoJSONFeature {
  geometry: {
    type: string;
    coordinates: any[];
  };
  properties?: Record<string, any>;
  type: string;
}

interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}

const StudentMap: React.FC<MapComponentProps> = ({ filteredStudents }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const isValidCoordinate = (coord: any): coord is number =>
    typeof coord === "number" && !isNaN(coord) && isFinite(coord);

  const isValidStudentLocation = (student: ProcessedStudentData): boolean =>
    isValidCoordinate(student.latitude) && isValidCoordinate(student.longitude);

  const validStudents = filteredStudents.filter(isValidStudentLocation);

  const qpvPolygonPaths: LatLngLiteral[][] =
    (qpvGeoJsonData as GeoJSON).features
      ?.map((feature) => {
        if (
          feature.geometry &&
          feature.geometry.type === "Polygon" &&
          Array.isArray(feature.geometry.coordinates)
        ) {
          return feature.geometry.coordinates[0]
            .map((coords: any) => {
              if (Array.isArray(coords) && coords.length >= 2) {
                const [lng, lat] = coords;
                if (isValidCoordinate(lat) && isValidCoordinate(lng)) {
                  return { lat, lng };
                }
              }
              return null;
            })
            .filter(
              (coord: LatLngLiteral): coord is LatLngLiteral => coord !== null
            );
        }
        return [];
      })
      .filter((path) => path.length > 0) || [];

  return (
    <Box width="100%" height="100%" position="relative">
      <LoadScript
        googleMapsApiKey="AIzaSyB2t6SKuPzb_lo3qNnUuYFqdiI4UC1tjZA"
        onLoad={handleLoad}
        loadingElement={
          <Box width="100%" height="100%">
            <Skeleton height="100%" startColor="gray.200" endColor="gray.300">
              <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <VStack spacing={4}>
                  <Text fontSize="lg" fontWeight="medium" color="gray.600">
                    {t("Loading map...")}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {t("Please wait while geographic data is loading.")}
                  </Text>
                </VStack>
              </Box>
            </Skeleton>
          </Box>
        }
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          options={mapOptions}
        >
          <Polygon paths={villeneuveCoords} options={villeneuvePolygonOptions} />

          {qpvPolygonPaths.map((path, index) => (
            <Polygon key={`qpv-${index}`} paths={path} options={qpvPolygonOptions} />
          ))}

          {isLoaded &&
            validStudents.map((student) => (
              <Marker
                key={student.id}
                position={{ lat: student.latitude, lng: student.longitude }}
                title={student.name}
                icon={createLocationMarker(student)}
              />
            ))}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default StudentMap;
