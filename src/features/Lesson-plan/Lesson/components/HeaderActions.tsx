import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaBook } from 'react-icons/fa';
import SearchFilter from '@/components/shared/CardFilter';
import LessonSidebar from './sidebar/LessonSidebar';

interface HeaderActionsProps {
  onFilterChange?: (value: string) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  filterType?: string;
  onFilterTypeChange?: (value: string) => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  onFilterChange,
  searchTerm = '',
  onSearchChange,
  filterType = 'all',
  onFilterTypeChange,
}) => {
  const { t } = useTranslation();

  const handleFilterChange = (value: string) => {
    // Call both callbacks for backward compatibility
    if (onFilterChange) {
      onFilterChange(value);
    }
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const isFilterActive = searchTerm.trim().length > 0 || filterType !== 'all';

  return (
    <Box 
      w="100%" 
      p={4} 
      bg="white" 
      boxShadow="md" 
      borderRadius="md" 
      _dark={{ bg: 'gray.800' }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={4}
      >
        {/* Title Section */}
        <HStack
          spacing={3}
          px={3}
          py={2}
          bg="blue.50"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="blue.100"
          _dark={{ bg: 'blue.900', borderColor: 'blue.700' }}
          flexShrink={0}
        >
          <Icon as={FaBook} boxSize={5} color="blue.500" />
          <Text
            fontSize="md"
            fontWeight="bold"
            color="blue.700"
            letterSpacing="wide"
            whiteSpace="nowrap"
            _dark={{ color: 'blue.300' }}
          >
            {t('Lessons List')}
          </Text>
        </HStack>

        {/* Search Filter */}
        <SearchFilter
          onFilterChange={handleFilterChange}
          placeholder="Search lessons by name, subject, or level..."
          isFilterActive={isFilterActive}
          value={searchTerm}
          width={{ base: "100%", sm: "300px", md: "25vw" }}
        />

        {/* Sidebar */}
        <LessonSidebar />
      </Flex>
    </Box>
  );
};

export default HeaderActions;