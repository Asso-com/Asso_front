import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { FaSearch, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

interface Partner {
  id: number;
  name: string;
  shortTitle?: string;
  address?: string;
  city?: string;
  geo_point_2d?: {
    lat: number;
    lon: number;
  };
}

interface SelectedLocation {
  lat: number;
  lng: number;
  name: string;
}

interface PartnerLocationListProps {
  partners: Partner[];
  isLoading: boolean;
  isError: boolean;
  onSeeOnMap: (location: SelectedLocation) => void;
  selectedLocation: SelectedLocation | null;
}

const PartnerLocationList: React.FC<PartnerLocationListProps> = ({
  partners,
  isLoading,
  onSeeOnMap,
  selectedLocation,
}) => {
  const [searchFilter, setSearchFilter] = useState("");

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (partner.address &&
        partner.address.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  if (isLoading) {
    return (
      <Box
        height="100%"
        bg="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack>
          <Spinner size="lg" color="blue.500" />
          <Text color="gray.600">Loading associations...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box height="100%" bg="white" display="flex" flexDirection="column">
      <Box p={4} borderBottom="1px" borderColor="gray.200" flexShrink={0}>
        <HStack mb={3}>
          <FaBuilding color="#3182ce" />
          <Text fontWeight="bold" fontSize="lg" color="blue.600">
            Villeneuve-la-Garenne Associations
          </Text>
        </HStack>

        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray" />
          </InputLeftElement>
          <Input
            placeholder="Search for an association..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </InputGroup>
      </Box>

      <Box flex={1} overflow="auto" p={2}>
        <VStack spacing={2} align="stretch">
          {filteredPartners.map((partner) => (
            <Box
              key={partner.id}
              p={3}
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              bg={selectedLocation?.name === partner.name ? "blue.50" : "white"}
              borderLeftColor={
                selectedLocation?.name === partner.name
                  ? "blue.500"
                  : "gray.200"
              }
              borderLeftWidth={
                selectedLocation?.name === partner.name ? "4px" : "1px"
              }
              _hover={{ bg: "gray.50" }}
            >
              <Text fontWeight="semibold" fontSize="sm" mb={1} noOfLines={2}>
                {partner.name}
              </Text>

              {partner.shortTitle && partner.shortTitle !== partner.name && (
                <Text fontSize="xs" color="gray.600" mb={1}>
                  {partner.shortTitle}
                </Text>
              )}

              <Text fontSize="xs" color="gray.500" mb={2}>
                📍 {partner.address} - {partner.city}
              </Text>

              <HStack justify="space-between" align="center">
                {partner.geo_point_2d && (
                  <Text fontSize="xs" color="gray.400">
                    {partner.geo_point_2d.lat.toFixed(4)},{" "}
                    {partner.geo_point_2d.lon.toFixed(4)}
                  </Text>
                )}

                <Button
                  size="xs"
                  colorScheme="blue"
                  leftIcon={<FaMapMarkerAlt />}
                  onClick={() => {
                    if (partner.geo_point_2d) {
                      onSeeOnMap({
                        lat: partner.geo_point_2d.lat,
                        lng: partner.geo_point_2d.lon,
                        name: partner.name,
                      });
                    }
                  }}
                  isDisabled={!partner.geo_point_2d}
                  variant={
                    selectedLocation?.name === partner.name
                      ? "solid"
                      : "outline"
                  }
                >
                  {selectedLocation?.name === partner.name
                    ? "Shown"
                    : "View on map"}
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default PartnerLocationList;
