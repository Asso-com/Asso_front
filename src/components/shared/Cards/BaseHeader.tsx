import React from 'react';
import {
  Box,
  HStack,
  Heading,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGraduationCap } from 'react-icons/fa';

interface BaseLevel {
  id: number;
  name: string;
}

interface BaseHeaderProps {
  level: BaseLevel;
  icon?: React.ComponentType;
  iconColor?: string;
  size?: string;
  children?: React.ReactNode;
}

export const BaseHeader: React.FC<BaseHeaderProps> = ({ 
  level, 
  icon = FaGraduationCap,
  iconColor,
  size = "sm",
  children 
}) => {
  const textColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <HStack spacing={2} flex={1}>
      <Box p={2} borderRadius="md">
        <Icon as={icon} boxSize={4} color={iconColor} />
      </Box>
      
      <Heading size={size} color={textColor} fontWeight="semibold">
        {level.name}
      </Heading>
      
      {children}
    </HStack>
  );
};

export type { BaseLevel };