import React from 'react';
import {
  Box,
  Button,
  Text,
  HStack,
  VStack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaExpand, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';

interface MapControlsProps {
  mapInstance: any;
  markersCount: number;
  totalCount: number;
  currentCount: number;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoadingMore: boolean;
  onFitBounds: () => void;
}

const MapControls: React.FC<MapControlsProps> = React.memo(({
  mapInstance,
  markersCount,
  totalCount,
  currentCount,
  hasMore,
  onLoadMore,
  isLoadingMore,
  onFitBounds,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      position="absolute"
      top={4}
      right={4}
      bg={bgColor}
      p={3}
      borderRadius="lg"
      boxShadow="xl"
      border="1px"
      borderColor={borderColor}
      zIndex={1000}
      minW="200px"
    >
      <VStack spacing={3} align="stretch">
        <Text fontSize="sm" fontWeight="bold" color="blue.600">
          📍 Map Controls
        </Text>

        <VStack spacing={1}>
          <HStack justify="space-between" width="100%">
            <Text fontSize="xs" color="gray.600">Markers on Map:</Text>
            <Badge colorScheme="blue" size="sm">{markersCount}</Badge>
          </HStack>
          <HStack justify="space-between" width="100%">
            <Text fontSize="xs" color="gray.600">Partners Loaded:</Text>
            <Badge colorScheme="green" size="sm">{currentCount}</Badge>
          </HStack>
          <HStack justify="space-between" width="100%">
            <Text fontSize="xs" color="gray.600">Total Available:</Text>
            <Badge colorScheme="purple" size="sm">{totalCount.toLocaleString()}</Badge>
          </HStack>
        </VStack>

        {hasMore && (
          <Button
            size="sm"
            colorScheme="green"
            leftIcon={<FaPlus />}
            onClick={onLoadMore}
            isLoading={isLoadingMore}
            loadingText="Loading..."
            width="100%"
          >
            Show More (+100)
          </Button>
        )}

        <Button
          size="sm"
          colorScheme="blue"
          leftIcon={<FaExpand />}
          onClick={onFitBounds}
          width="100%"
        >
          Fit All Markers
        </Button>

        <Button
          size="sm"
          variant="outline"
          colorScheme="gray"
          leftIcon={<FaMapMarkerAlt />}
          onClick={() => {
            if (mapInstance) {
              mapInstance.setCenter({ lat: 48.8566, lng: 2.3522 });
              mapInstance.setZoom(10);
            }
          }}
          width="100%"
        >
          Center Paris
        </Button>

        {!hasMore && currentCount > 0 && (
          <Text fontSize="xs" color="green.600" textAlign="center" fontWeight="bold">
            ✅ All available partners loaded!
          </Text>
        )}
      </VStack>
    </Box>
  );
});

MapControls.displayName = 'MapControls';

export default MapControls;