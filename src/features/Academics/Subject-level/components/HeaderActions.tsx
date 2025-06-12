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
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { FcDepartment } from "react-icons/fc";
import { FiSearch } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { MdOutlineFilterAltOff, MdFilterAlt } from "react-icons/md";
import GenericIconButtonWithTooltip from "../../../../components/shared/icons-buttons/GenericIconButtonWithTooltip";
import SubjectLevelSidebar from "./sidebar/SubjectLevelSidebar";

interface HeaderActionsProps {
  onFilterChange?: (value: string) => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  onFilterChange,
}) => {
  const { t } = useTranslation();
  const [isFilterActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


const handleClearFilter = () => {
  if (onFilterChange) onFilterChange("");
  if (inputRef.current) inputRef.current.value = "";
};
  const inputBg = useColorModeValue("white", "gray.700");
  const inputHoverBg = useColorModeValue("gray.50", "gray.600");
  const inputFocusShadow = useColorModeValue(
    "0 0 0 2px rgba(66, 153, 225, 0.6)",
    "0 0 0 2px rgba(66, 153, 225, 0.4)"
  );

  return (
    <Box w="100%" p={4} bg="white" boxShadow="md" borderRadius="md">
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={4}
      >
        <HStack
          spacing={3}
          px={3}
          py={2}
          bg="blue.50"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="blue.100"
        >
          <Icon as={FcDepartment} boxSize={5} color="blue.500" />
          <Text
            fontSize="md"
            fontWeight="bold"
            color="blue.700"
            letterSpacing="wide"
            whiteSpace="nowrap"
          >
            {t("Subject Levels List")}
          </Text>
        </HStack>

        {onFilterChange && (
          <Flex w="100%" justify="center" gap={4} flexWrap="wrap">
            {/* Search Input */}
             <Flex alignItems={"center"} position={"relative"}>
              <GenericIconButtonWithTooltip
                icon={
                  isFilterActive ? (
                    <MdFilterAlt size={20} color="#2196f3" />
                  ) : (
                    <MdOutlineFilterAltOff size={20} color="#666" />
                  )
                }
                label={t("Clear filter")}
                ariaLabel={"Clear filter"}
                onClick={handleClearFilter}
                variant={"outline"}
                size="md"
              />
              {isFilterActive && (
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
            <Box w={{ base: "100%", sm: "300px", md: "25vw" }}>
              <InputGroup size="md">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="gray.400" boxSize={4} />
                </InputLeftElement>
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={t("Search subjects...")}
                  onChange={(e) => onFilterChange(e.target.value)}
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
        )}
        <SubjectLevelSidebar />
      </Flex>
    </Box>
  );
};

export default HeaderActions;
