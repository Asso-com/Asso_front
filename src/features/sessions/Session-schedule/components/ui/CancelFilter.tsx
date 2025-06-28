import { Button, Center, Heading, VStack, Text, Icon } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import type { FC } from "react";
interface CancelFilterProps {
  clearFilters: () => void;
}

const CancelFilter: FC<CancelFilterProps> = ({ clearFilters }) => {
  const { t } = useTranslation();

  return (
    <Center py={16}>
      <VStack spacing={6}>
        <Icon as={FiSearch} boxSize={16} color="gray.300" />
        <Heading size="lg" color="gray.400">
          {t("noSessionsFound", "No sessions found")}
        </Heading>
        <Text color="gray.500" textAlign="center" maxW="md">
          {t(
            "tryChangingOrClearingFilters",
            "Try changing your search criteria or clearing the filters"
          )}
        </Text>
        <Button onClick={clearFilters} colorScheme="blue" size="lg">
          {t("resetFilters", "Reset filters")}
        </Button>
      </VStack>
    </Center>
  );
};

export default CancelFilter;
