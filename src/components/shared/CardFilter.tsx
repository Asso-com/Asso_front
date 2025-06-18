import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { MdOutlineFilterAltOff, MdFilterAlt } from "react-icons/md";
import GenericIconButtonWithTooltip from "./icons-buttons/GenericIconButtonWithTooltip";

interface SearchFilterProps {
  onFilterChange: (value: string) => void;
  placeholder?: string;
  width?: { base: string; sm: string; md: string };
  isFilterActive?: boolean;
  value?: string; // Add controlled value prop
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  onFilterChange,
  placeholder = "Search...",
  width = { base: "100%", sm: "300px", md: "25vw" },
  isFilterActive = false,
  value = "",
}) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(value);

  // Sync internal state with external value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    onFilterChange(newValue);
  };

  const handleClearFilter = () => {
    setInputValue("");
    onFilterChange("");
  };

  const inputBg = useColorModeValue("white", "gray.700");
  const inputHoverBg = useColorModeValue("gray.50", "gray.600");
  const inputFocusShadow = useColorModeValue(
    "0 0 0 2px rgba(66, 153, 225, 0.6)",
    "0 0 0 2px rgba(66, 153, 225, 0.4)"
  );

  const actuallyActive = isFilterActive || inputValue.trim().length > 0;

  return (
    <Flex w="100%" justify="center" gap={4} flexWrap="wrap">
      {/* Filter Status Button */}
      <Flex alignItems="center" position="relative">
        <GenericIconButtonWithTooltip
          icon={
            actuallyActive ? (
              <MdFilterAlt size={20} color="#2196f3" />
            ) : (
              <MdOutlineFilterAltOff size={20} color="#666" />
            )
          }
          label={t("Clear filter")}
          ariaLabel="Clear filter"
          onClick={handleClearFilter}
          variant="outline"
          size="md"
        />
        {actuallyActive && (
          <Box
            height={2}
            width={2}
            borderRadius="full"
            bg="#2196f3"
            position="absolute"
            top={2}
            right={2}
          />
        )}
      </Flex>

      {/* Search Input */}
      <Box w={width}>
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" boxSize={4} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder={t(placeholder)}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            fontSize="sm"
            bg={inputBg}
            _hover={{ bg: inputHoverBg }}
            _focus={{
              bg: inputHoverBg,
              boxShadow: inputFocusShadow,
              borderColor: "blue.400",
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
              _hover={{ color: "red.500", transform: "scale(1.2)" }}
              transition="all 0.2s ease"
              onClick={handleClearFilter}
              boxSize={4}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default SearchFilter;