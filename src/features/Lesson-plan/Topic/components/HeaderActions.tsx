// HeaderActionsTopics.tsx
import React from 'react';
import {
  Box,
  Text,
  Flex,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaBookOpen } from 'react-icons/fa';
import SearchFilter from '@/components/shared/CardFilter';
import TopicSidebar from './sidebar/TopicSidebar';

interface HeaderActionsTopicsProps {
  onFilterChange?: (value: string) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  filterType?: string;
}

const HeaderActions: React.FC<HeaderActionsTopicsProps> = ({
  onFilterChange,
  searchTerm = '',
  onSearchChange,
  filterType = 'all'
}) => {
  const { t } = useTranslation();

  // Separate the search and filter logic
  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleFilterChange = (value: string) => {
    if (onFilterChange) {
      onFilterChange(value);
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
          bg="green.50"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="green.100"
          _dark={{ bg: 'green.900', borderColor: 'green.700' }}
          flexShrink={0}
        >
          <Icon as={FaBookOpen} boxSize={5} color="green.500" />
          <Text
            fontSize="md"
            fontWeight="bold"
            color="green.700"
            letterSpacing="wide"
            whiteSpace="nowrap"
            _dark={{ color: 'green.300' }}
          >
            {t('Topics List')}
          </Text>
        </HStack>

        {/* Search Filter */}
        <SearchFilter
          onFilterChange={handleSearchChange} // Fixed: use search handler
          placeholder="Search by lesson name or subject level..."
          isFilterActive={isFilterActive}
          value={searchTerm}
          width={{ base: "100%", sm: "300px", md: "25vw" }}
        />

        <TopicSidebar />
      </Flex>
    </Box>
  );
};

export default HeaderActions;