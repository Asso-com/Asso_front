import React, { useRef, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaBook, FaTimes } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineFilterAltOff, MdFilterAlt } from 'react-icons/md';
import GenericIconButtonWithTooltip from '../../../../components/shared/icons-buttons/GenericIconButtonWithTooltip';
import LessonSidebar from './sidebar/LessonSidebar';

interface HeaderActionsProps {
  onFilterChange?: (value: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  onFilterChange,
  searchTerm,
  onSearchChange,
  filterType,
  onFilterTypeChange,
}) => {
  const { t } = useTranslation();
  const [isFilterActive, setIsFilterActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearFilter = () => {
    if (onFilterChange) onFilterChange('');
    onSearchChange('');
    onFilterTypeChange('all');
    if (inputRef.current) inputRef.current.value = '';
    setIsFilterActive(false);
  };

  const handleSearchChange = (value: string) => {
    onSearchChange(value);
    if (onFilterChange) onFilterChange(value);
    setIsFilterActive(value !== '' || filterType !== 'all');
  };

  const inputBg = useColorModeValue('white', 'gray.700');
  const inputHoverBg = useColorModeValue('gray.50', 'gray.600');
  const inputFocusShadow = useColorModeValue(
    '0 0 0 2px rgba(66, 153, 225, 0.6)',
    '0 0 0 2px rgba(66, 153, 225, 0.4)'
  );

  React.useEffect(() => {
    setIsFilterActive(searchTerm !== '' || filterType !== 'all');
  }, [searchTerm, filterType]);

  return (
    <Box w="100%" p={4} bg="white" boxShadow="md" borderRadius="md" _dark={{ bg: 'gray.800' }}>
      <Flex
        align="center"
        justify="space-between"
        gap={4}
        w="100%"
      >
        {/* Title Section (Subject List) */}
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

        {/* Clear Filter Button + Search Input (centrés) */}
        <Flex align="center" gap={3} flexShrink={0}>
          {/* Clear Filter Button */}
          <Box position="relative">
            <GenericIconButtonWithTooltip
              icon={
                isFilterActive ? (
                  <MdFilterAlt size={20} color="#2196f3" />
                ) : (
                  <MdOutlineFilterAltOff size={20} color="#666" />
                )
              }
              label={t('Clear filter') || 'Clear filter'}
              ariaLabel={'Clear filter'}
              onClick={handleClearFilter}
              variant="outline"
              size="md"
            />
            {isFilterActive && (
              <Box
                height={2}
                width={2}
                borderRadius="full"
                bg="#2196f3"
                position="absolute"
                top={1}
                right={1}
              />
            )}
          </Box>

          {/* Search Input */}
          <Box w={{ base: '200px', sm: '250px', md: '300px' }}>
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.400" boxSize={4} />
              </InputLeftElement>
              <Input
                ref={inputRef}
                type="text"
                placeholder={t('Search subjects by name or code...') || 'Search subjects by name or code...'}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                fontSize="sm"
                bg={inputBg}
                _hover={{ bg: inputHoverBg }}
                _focus={{
                  bg: inputHoverBg,
                  boxShadow: inputFocusShadow,
                  borderColor: 'blue.400',
                }}
                pl="40px"
                pr="40px"
                borderRadius="full"
                transition="all 0.2s ease-in-out"
              />
              <InputRightElement>
                <Icon
                  as={FaTimes}
                  color="gray.500"
                  cursor="pointer"
                  _hover={{ color: 'red.500', transform: 'scale(1.2)' }}
                  transition="all 0.2s ease"
                  onClick={handleClearFilter}
                  boxSize={4}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
              </Flex>
              <LessonSidebar />
      </Flex>
    </Box>
  );
}

export default HeaderActions;