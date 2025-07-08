import { useEffect, useRef, useState, useCallback } from "react";
import { Box, Flex } from "@chakra-ui/react";
import PartnerLocationList from "./components/PartnerLocationList";
import MapControls from "./components/MapControls";
import useLocationPartners from "./hooks/useLocationPartners";
import mapStyles from "./constants/mapStyles";

const GOOGLE_MAPS_API_KEY = "AIzaSyB2t6SKuPzb_lo3qNnUuYFqdiI4UC1tjZA";

declare global {
  interface Window {
    google: typeof google;
  }
}

interface SelectedLocation {
  lat: number;
  lng: number;
  name: string;
}

interface PartnerMarker {
  marker: any;
  partner: any;
}

const LocationContainer: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<PartnerMarker[]>([]);
  const infoWindowRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);

  const { partners, isLoading, isError } = useLocationPartners();

  const villeneuveLaGarenneCoords = [
    { lat: 48.944, lng: 2.316 },
    { lat: 48.9445, lng: 2.34 },
    { lat: 48.935, lng: 2.345 },
    { lat: 48.928, lng: 2.34 },
    { lat: 48.926, lng: 2.32 },
    { lat: 48.93, lng: 2.31 },
    { lat: 48.944, lng: 2.316 },
  ];

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google || mapInstanceRef.current) {
      return;
    }

    const mapOptions = {
      center: { lat: 48.936616, lng: 2.324789 },
      zoom: 15.5,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: false,
      zoomControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      styles: mapStyles,
    };

    mapInstanceRef.current = new window.google.maps.Map(
      mapRef.current,
      mapOptions
    );
    infoWindowRef.current = new window.google.maps.InfoWindow();

    // Add polygon
    const villeneuvePolygon = new window.google.maps.Polygon({
      paths: villeneuveLaGarenneCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.1,
    });
    villeneuvePolygon.setMap(mapInstanceRef.current);

    // Fit map to polygon bounds with zoom constraints
    const bounds = new window.google.maps.LatLngBounds();
    villeneuveLaGarenneCoords.forEach((coord) => {
      bounds.extend(coord);
    });

    // First fit to bounds
    mapInstanceRef.current.fitBounds(bounds);

    setIsMapLoaded(true);
  }, []);

  const addMarkersToMap = useCallback(() => {
    if (!mapInstanceRef.current || !window.google || !partners.length) {
      return;
    }

    markersRef.current.forEach(({ marker }) => marker.setMap(null));
    markersRef.current = [];

    const bounds = new window.google.maps.LatLngBounds();

    const batchSize = 50;
    let index = 0;

    const addBatch = () => {
      const endIndex = Math.min(index + batchSize, partners.length);
      const batch = partners.slice(index, endIndex);

      batch.forEach((partner) => {
        if (!partner.geo_point_2d) return;

        try {
          const marker = new window.google.maps.Marker({
            position: {
              lat: partner.geo_point_2d.lat,
              lng: partner.geo_point_2d.lon,
            },
            map: mapInstanceRef.current,
            title: partner.name,
            optimized: true,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 5,
              fillColor: "#3182ce",
              fillOpacity: 0.8,
              strokeColor: "#ffffff",
              strokeWeight: 1,
            },
          });

          marker.addListener("click", () => {
            if (infoWindowRef.current) {
              infoWindowRef.current.close();
            }
            infoWindowRef.current.setContent(`
              <div style="padding: 10px; font-family: Arial, sans-serif; max-width: 250px;">
                <h4 style="margin: 0 0 6px 0; color: #1a365d; font-size: 14px; font-weight: bold;">${
                  partner.name
                }</h4>
                ${
                  partner.shortTitle
                    ? `<p style="margin: 0 0 4px 0; color: #666; font-size: 12px; font-style: italic;">${partner.shortTitle}</p>`
                    : ""
                }
                <p style="margin: 0 0 4px 0; color: #4a5568; font-size: 12px;">📍 ${
                  partner.address
                }</p>
                <p style="margin: 0 0 4px 0; color: #4a5568; font-size: 12px;">🏙️ ${
                  partner.city
                }</p>
              </div>
            `);
            infoWindowRef.current.open(mapInstanceRef.current, marker);
            setSelectedLocation({
              lat: partner.geo_point_2d.lat,
              lng: partner.geo_point_2d.lon,
              name: partner.name,
            });
          });

          const position = marker.getPosition();
          if (position) {
            bounds.extend(position);
          }
          markersRef.current.push({ marker, partner });
        } catch (error) {}
      });

      index = endIndex;
      if (index < partners.length) {
        setTimeout(addBatch, 10);
      }
    };
    addBatch();
  }, [partners]);

  const handleSeeOnMap = useCallback((location: SelectedLocation) => {
    if (!mapInstanceRef.current) return;

    mapInstanceRef.current.setCenter({ lat: location.lat, lng: location.lng });
    mapInstanceRef.current.setZoom(17);

    const targetMarker = markersRef.current.find(
      ({ partner }) => partner.name === location.name
    );
    if (targetMarker) {
      setTimeout(() => {
        window.google.maps.event.trigger(targetMarker.marker, "click");
      }, 300);
    }
    setSelectedLocation(location);
  }, []);

  const handleFitBounds = useCallback(() => {
    if (!mapInstanceRef.current || !markersRef.current.length) return;

    try {
      const bounds = new window.google.maps.LatLngBounds();
      markersRef.current.forEach(({ marker }) => {
        const position = marker.getPosition();
        if (position) {
          bounds.extend(position);
        }
      });
      mapInstanceRef.current.fitBounds(bounds);
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (window.google?.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setTimeout(initializeMap, 50);
    };
    document.head.appendChild(script);

    return () => {
      document.querySelector(`script[src*="maps.googleapis.com"]`)?.remove();
    };
  }, []);

  useEffect(() => {
    if (isMapLoaded && partners.length > 0) {
      addMarkersToMap();
    }
  }, [isMapLoaded, partners, addMarkersToMap]);

  return (
    <Flex height="100%" overflow="hidden">
      <Box
        width="25%"
        height="100%"
        borderRight="2px solid #e2e8f0"
        overflow="hidden"
      >
        <PartnerLocationList
          partners={partners}
          isLoading={isLoading}
          isError={isError}
          onSeeOnMap={handleSeeOnMap}
          selectedLocation={selectedLocation}
        />
      </Box>
      <Box width="75%" height="100%" position="relative">
        <Box ref={mapRef} width="100%" height="100%" bg="gray.100" />
        {isMapLoaded && (
          <MapControls
            mapInstance={mapInstanceRef.current}
            onFitBounds={handleFitBounds}
          />
        )}
        {(!isMapLoaded || isLoading) && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="rgba(255,255,255,0.95)"
            zIndex={999}
          >
            <Box textAlign="center">
              <Box
                width="50px"
                height="50px"
                border="2px solid #e2e8f0"
                borderTop="4px solid #3182ce"
                borderRadius="50%"
                animation="spin 0.8s linear infinite"
                mx="auto"
                mb={4}
              />
              <Box fontSize="lg" fontWeight="bold" color="blue.600" mb={2}>
                {isLoading ? "Loading all partners..." : "Initializing map..."}
              </Box>
              <Box fontSize="sm" color="gray.600">
                Please wait, loading all locations
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default LocationContainer;