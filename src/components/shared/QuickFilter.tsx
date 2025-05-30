import React, { useState, useCallback, useRef } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import type { AgGridReact } from "ag-grid-react";
import type { ICellRendererParams } from "ag-grid-community";

// Define props interface
interface QuickFilterProps {
  gridRef: React.RefObject<AgGridReact>;
  placeholder?: string;
}

const QuickFilter: React.FC<QuickFilterProps> = ({
  gridRef,
  placeholder = "Search here",
}) => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFilterTextBoxChanged = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.setGridOption(
        "quickFilterText",
        inputRef.current?.value
      );
    }
  }, [gridRef]);

  const handleClearIconClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      onFilterTextBoxChanged();
    }
  };
  const inputBg = useColorModeValue("white", "gray.700");
  const inputHoverBg = useColorModeValue("gray.50", "gray.600");

  return (
    <Flex w="100%" justify="center" px={4}>
      <Box w={{ base: "100%", sm: "300px", md: "25vw" }}>
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            ref={inputRef}
            type="text"
            placeholder={t(placeholder)}
            focusBorderColor="blue.500"
            onChange={onFilterTextBoxChanged}
            fontSize="sm"
            bg={inputBg}
            _hover={{ bg: inputHoverBg }}
            _focus={{ bg: inputHoverBg }}
            pl="40px"
            pr="40px"
            borderRadius="full"
          />
          <InputRightElement>
            <Icon
              as={FaTimes}
              color="gray.500"
              cursor="pointer"
              _hover={{ color: "red.500", transform: "scale(1.2)" }}
              transition="all 0.2s"
              onClick={handleClearIconClick}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default QuickFilter;
