import React from "react";
import {
  Card,
  CardBody,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiGrid, FiList, FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface PanelOptionsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedLevel: string;
  setSelectedLevel: (value: string) => void;
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  uniqueLevels: string[];
  uniqueSubjects: string[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const PanelOptions: React.FC<PanelOptionsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  selectedSubject,
  setSelectedSubject,
  uniqueLevels,
  uniqueSubjects,
  viewMode,
  setViewMode,
}) => {
  const { t } = useTranslation();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Card bg={cardBg} border="1px" borderColor={borderColor}>
      <CardBody>
        <Flex direction={{ base: "column", md: "row" }} gap={4} align="center">
          <InputGroup flex="1">
            <InputLeftElement pointerEvents="none">
              <FiSearch color={textColor} />
            </InputLeftElement>
            <Input
              placeholder={t("Search for a student...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Select
            placeholder={t("Filter by level")}
            w={{ base: "full", md: "200px" }}
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {uniqueLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>

          <Select
            placeholder={t("Filter by subject")}
            w={{ base: "full", md: "200px" }}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {uniqueSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </Select>

          <HStack>
            <IconButton
              aria-label={t("Grid view")}
              icon={<FiGrid />}
              variant={viewMode === "grid" ? "solid" : "outline"}
              colorScheme="blue"
              onClick={() => setViewMode("grid")}
            />
            <IconButton
              aria-label={t("List view")}
              icon={<FiList />}
              variant={viewMode === "list" ? "solid" : "outline"}
              colorScheme="blue"
              onClick={() => setViewMode("list")}
            />
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PanelOptions;
