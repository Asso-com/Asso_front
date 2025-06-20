import React, { useState } from 'react';
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
  Center,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { FaSearch, FaMapMarkerAlt, FaBuilding, FaPlus } from 'react-icons/fa';

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
  totalCount: number;
  currentCount: number;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoadingMore: boolean;
}

const PartnerLocationList: React.FC<PartnerLocationListProps> = ({
  partners,
  isLoading,
  isError,
  onSeeOnMap,
  selectedLocation,
  totalCount,
  currentCount,
  hasMore,
  onLoadMore,
  isLoadingMore,
}) => {
  console.log('🔍 PartnerLocationList rendered with partners:', partners.length);
  const [searchFilter, setSearchFilter] = useState('');

  // Remplacer useColorModeValue par des valeurs fixes pour éviter les problèmes de Hooks
  const bgColor = 'white';
  const borderColor = 'gray.200';
  const hoverBg = 'gray.50';

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (partner.city && partner.city.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  if (isLoading) {
    return (
      <Box height="100%" bg={bgColor}>
        <Center height="100%" flexDirection="column">
          <Spinner size="lg" color="blue.500" mb={4} />
          <Text color="gray.600">Loading partners...</Text>
        </Center>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box height="100%" bg={bgColor}>
        <Center height="100%" flexDirection="column">
          <Text color="red.500" fontWeight="bold" mb={2}>
            Error
          </Text>
          <Text color="gray.600" fontSize="sm" textAlign="center">
            Failed to load partners
          </Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box height="100%" bg={bgColor} display="flex" flexDirection="column">
      <Box p={4} borderBottom="1px" borderColor={borderColor} flexShrink={0}>
        <HStack mb={3}>
          <FaBuilding color="#3182ce" />
          <Text fontWeight="bold" fontSize="lg" color="blue.600">
            Partners Location
          </Text>
        </HStack>
        <Badge colorScheme="blue" mb={3}>
          {filteredPartners.length} partners found
        </Badge>
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray" />
          </InputLeftElement>
          <Input
            placeholder="Search partners..."
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
              borderColor={borderColor}
              borderRadius="md"
              bg={selectedLocation?.name === partner.name ? 'blue.50' : bgColor}
              borderLeftColor={selectedLocation?.name === partner.name ? 'blue.500' : borderColor}
              borderLeftWidth={selectedLocation?.name === partner.name ? '4px' : '1px'}
              _hover={{ bg: hoverBg }}
              transition="all 0.2s"
            >
              <Text fontWeight="semibold" fontSize="sm" mb={1} noOfLines={2} title={partner.name}>
                {partner.name}
              </Text>
              {partner.shortTitle && (
                <Text fontSize="xs" color="gray.600" mb={1} noOfLines={1}>
                  {partner.shortTitle}
                </Text>
              )}
              <Text fontSize="xs" color="gray.500" mb={2} noOfLines={2}>
                📍 {partner.address} - {partner.city}
              </Text>
              <HStack justify="space-between" align="center">
                <Text fontSize="xs" color="gray.400">
                  {partner.geo_point_2d?.lat.toFixed(4)}, {partner.geo_point_2d?.lon.toFixed(4)}
                </Text>
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
                  variant={selectedLocation?.name === partner.name ? 'solid' : 'outline'}
                >
                  {selectedLocation?.name === partner.name ? 'Viewing' : 'See on Map'}
                </Button>
              </HStack>
              <Divider mt={2} />
            </Box>
          ))}
        </VStack>
      </Box>

      <Box p={3} borderTop="1px" borderColor={borderColor} bg="gray.50" flexShrink={0}>
        <Text fontSize="xs" color="gray.600" textAlign="center">
          {selectedLocation ? `📍 Viewing: ${selectedLocation.name}` : '🗺️ Select a partner to view on map'}
        </Text>
        {hasMore && (
          <Button
            size="sm"
            colorScheme="green"
            leftIcon={<FaPlus />}
            onClick={onLoadMore}
            isLoading={isLoadingMore}
            loadingText="Loading..."
            width="100%"
            mt={3}
          >
            Show More (+100)
          </Button>
        )}
        {!hasMore && currentCount > 0 && (
          <Text fontSize="xs" color="green.600" textAlign="center" fontWeight="bold" mt={2}>
            ✅ All available partners loaded! ({currentCount}/{totalCount})
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default PartnerLocationList;