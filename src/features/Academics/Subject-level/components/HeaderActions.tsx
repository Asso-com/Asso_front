import {
  Box,
  Text,
  Flex,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FcDepartment } from "react-icons/fc";
import SubjectLevelSidebar from "./sidebar/SubjectLevelSidebar";
import SearchFilter from "@/components/shared/CardFilter";

interface HeaderActionsProps {
  onFilterChange?: (value: string) => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  onFilterChange,
}) => {
  const { t } = useTranslation();
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (value: string) => {
    setFilterText(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  const isFilterActive = filterText.trim().length > 0;

  return (
    <Box w="100%" p={4} bg="white" boxShadow="md" borderRadius="md">
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

        {/* Search Filter */}
        {onFilterChange && (
          <SearchFilter
            onFilterChange={handleFilterChange}
            placeholder="Search subjects..."
            isFilterActive={isFilterActive}
            width={{ base: "100%", sm: "300px", md: "25vw" }}
          />
        )}

        {/* Sidebar */}
        <SubjectLevelSidebar />
      </Flex>
    </Box>
  );
};

export default HeaderActions;