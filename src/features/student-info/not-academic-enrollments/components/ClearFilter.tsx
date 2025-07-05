import React from "react";
import {
  Card,
  CardBody,
  VStack,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiUsers, FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface ClearFilterProps {
  filteredStudents: any[];
  setSearchTerm: (value: string) => void;
  setSelectedLevel: (value: string) => void;
  setSelectedSubject: (value: string) => void;
}

const ClearFilter: React.FC<ClearFilterProps> = ({
  filteredStudents,
  setSearchTerm,
  setSelectedLevel,
  setSelectedSubject,
}) => {
  const { t } = useTranslation();

  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");

  if (filteredStudents.length !== 0) return null;

  return (
    <Card bg={cardBg} border="1px" borderColor={borderColor}>
      <CardBody>
        <VStack spacing={4} py={8}>
          <FiUsers size={48} color={textColor} />
          <Text fontSize="lg" fontWeight="medium" color={headingColor}>
            {t("No students found")}
          </Text>
          <Text color={textColor} textAlign="center">
            {t("Try modifying your search criteria or adjusting the filters")}
          </Text>
          <Button
            colorScheme="blue"
            leftIcon={<FiPlus />}
            onClick={() => {
              setSearchTerm("");
              setSelectedLevel("");
              setSelectedSubject("");
            }}
          >
            {t("Reset filters")}
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ClearFilter;
