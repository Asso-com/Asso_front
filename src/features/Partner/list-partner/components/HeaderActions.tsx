import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Icon,
  Badge,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { 
  FaHandshake,
  FaSearch,
} from "react-icons/fa";
import ClearFilter from "@components/shared/ClearFilter";
import QuickFilter from "@components/shared/QuickFilter";

interface HeaderActionsProps {
  gridRef: React.RefObject<any>;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  gridRef,
  totalCount,
  // ✅ PARAMÈTRES PAGINATION (pas utilisés dans l'affichage, mais gardés pour compatibilité)
}) => {
  const [quickFilterText, setQuickFilterText] = useState("");
  
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // ✅ FALLBACK FILTERS COMME SUBJECT
  const FallbackClearFilter = () => (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        setQuickFilterText("");
        if (gridRef.current?.api) {
          gridRef.current.api.setQuickFilter("");
          gridRef.current.api.setFilterModel(null);
        }
      }}
      colorScheme="gray"
      isDisabled={!quickFilterText}
    >
      Clear Filters
    </Button>
  );

  const FallbackQuickFilter = () => (
    <InputGroup maxW="300px">
      <InputLeftElement pointerEvents="none">
        <Icon as={FaSearch} color="gray.400" />
      </InputLeftElement>
      <Input
        placeholder="Search in table..."
        value={quickFilterText}
        onChange={(e) => {
          const value = e.target.value;
          setQuickFilterText(value);
          if (gridRef.current?.api) {
            gridRef.current.api.setQuickFilter(value);
          }
        }}
        size="sm"
      />
    </InputGroup>
  );

  const FilterComponents = () => {
    try {
      return (
        <>
          <ClearFilter gridRef={gridRef} />
          <QuickFilter gridRef={gridRef} />
        </>
      );
    } catch (error) {
      return (
        <>
          <FallbackClearFilter />
          <FallbackQuickFilter />
        </>
      );
    }
  };

  return (
    <Box
      w="100%"
      p={2}
      bg={bgColor}
      boxShadow="md"
      borderRadius="md"
      border="1px"
      borderColor={borderColor}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={4}
      >
        {/* ✅ TITRE STYLE SUBJECT EXACT */}
        <HStack 
          spacing={3} 
          px={3} 
          py={2} 
          bg="blue.50" 
          borderRadius="lg"
          borderWidth="1px"
          borderColor="blue.100"
        >
          <Icon as={FaHandshake} boxSize={5} color="blue.500" />
          <Text 
            fontSize="md" 
            fontWeight="bold" 
            color="blue.700"
            letterSpacing="wide"
          >
            Partner List
          </Text>
          <Badge colorScheme="blue" px={2} py={1} borderRadius="full">
            {totalCount.toLocaleString()}
          </Badge>
        </HStack>

        {/* ✅ FILTRES SEULEMENT COMME SUBJECT */}
        <Flex alignItems="center" gap={2}>
          <FilterComponents />
        </Flex>
      </Flex>
      
      {/* ✅ PAS DE PAGINATION ICI - TOUT GÉRÉ PAR AG-GRID */}
    </Box>
  );
};

export default HeaderActions;