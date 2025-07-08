import {
  Button,
  VStack,
  Text,
  useColorModeValue,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FiPlus, FiSearch } from "react-icons/fi";
import type { FC } from "react";
interface CancelFilterProps {
  clearFilters: () => void;
}

const CancelFilter: FC<CancelFilterProps> = ({ clearFilters }) => {
  const { t } = useTranslation();
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  return (
    <Card bg={cardBg} border="1px" borderColor={borderColor}>
      <CardBody>
        <VStack spacing={4} py={8}>
          <FiSearch size={48} color={textColor} />
          <Text fontSize="lg" fontWeight="medium" color={headingColor}>
            {t("No sessions found")}
          </Text>
          <Text color={textColor} textAlign="center">
            {t("Try changing your search criteria or clearing the filters")}
          </Text>
          <Button
            colorScheme="blue"
            leftIcon={<FiPlus />}
            onClick={clearFilters}
          >
            {t("Reset filters")}
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default CancelFilter;
