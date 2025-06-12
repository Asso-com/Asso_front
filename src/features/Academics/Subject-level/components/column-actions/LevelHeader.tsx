import React from 'react';
import {
  Box,
  HStack,
  Heading,
  Icon,
  VStack,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { FaGraduationCap } from 'react-icons/fa';
import type { Level } from '../../types/subject.types';

interface LevelHeaderProps {
  level: Level;
}

export const LevelHeader: React.FC<LevelHeaderProps> = ({ 
  level, 
}) => {
  const textColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
      <HStack spacing={4}>
        <Box 
          p={3} 
          borderRadius="lg" 
        >
          <Icon as={FaGraduationCap} boxSize={6} />
        </Box>

        <VStack align="start" spacing={1}>
          <Heading size="md" color={textColor} fontWeight="bold">
            {level.name}
          </Heading>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default LevelHeader;