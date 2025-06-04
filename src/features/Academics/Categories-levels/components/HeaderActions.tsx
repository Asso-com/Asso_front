import { Box, Text, Flex, HStack, Icon } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ClearFilter from "@components/shared/ClearFilter";
import QuickFilter from "@components/shared/QuickFilter";
import { TbCategoryPlus } from "react-icons/tb";
import CategorieLevelSidebar from "./sidebar/CategorieLevelSidebar";

const HeaderActions = ({ gridRef }: any) => {
  const { t } = useTranslation();
  return (
    <Box w="100%" p={2} bg="white" boxShadow="md" borderRadius="md">
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
          <Icon as={TbCategoryPlus} boxSize={5} color="blue.500" />
          <Text
            fontSize="md"
            fontWeight="bold"
            color="blue.700"
            letterSpacing="wide"
          >
            {t("Levels Categories List")}
          </Text>
        </HStack>

        {/* Filters Section */}
        <Flex alignItems="center" gap={2}>
          <ClearFilter gridRef={gridRef} />
          <QuickFilter gridRef={gridRef} />
        </Flex>
        <CategorieLevelSidebar />
      </Flex>
    </Box>
  );
};

export default HeaderActions;
