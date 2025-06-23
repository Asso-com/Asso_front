import React from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaExpand, FaMapMarkerAlt } from 'react-icons/fa';

interface MapControlsProps {
  mapInstance: any;
  markersCount: number;
  totalCount: number;
  currentCount: number;
  onFitBounds: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  mapInstance,

  currentCount,
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
      p={4}
      borderRadius="lg"
      boxShadow="xl"
      border="1px"
      borderColor={borderColor}
      zIndex={1000}
      minW="220px"
    >
      <VStack spacing={3} align="stretch">
        <Text fontSize="sm" fontWeight="bold" color="blue.600">
          🗺️ Map Controls
        </Text>

        <VStack spacing={2}>
    
          <Badge colorScheme="green" size="sm" p={1}>
            {currentCount} associations found
          </Badge>
        </VStack>

        <Button
          size="sm"
          colorScheme="blue"
          leftIcon={<FaExpand />}
          onClick={onFitBounds}
          width="100%"
        >
          View all markers
        </Button>

        <Button
          size="sm"
          variant="outline"
          colorScheme="gray"
          leftIcon={<FaMapMarkerAlt />}
          onClick={() => {
            if (mapInstance) {
              mapInstance.setCenter({ lat: 48.936616, lng: 2.324789 });
              mapInstance.setZoom(14);
            }
          }}
          width="100%"
        >
          Center on Villeneuve
        </Button>

        <Text fontSize="xs" color="green.600" textAlign="center" fontWeight="bold">
          ✅ All associations displayed
        </Text>
      </VStack>
    </Box>
  );
};

export default MapControls;