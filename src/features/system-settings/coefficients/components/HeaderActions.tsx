
import { Box, Text, Flex, HStack, Icon } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ClearFilter from "@components/shared/ClearFilter";
import QuickFilter from "@components/shared/QuickFilter";
import CoefficientSidebar from "./sidebar/CoefficientSidebar";
import { FaPercent } from "react-icons/fa";

const HeaderActions = ({ gridRef }: any) => {
  const { t } = useTranslation();
  
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
          bg="purple.50"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="purple.100"
        >
          <Icon as={FaPercent} boxSize={5} color="purple.500" />
          <Text
            fontSize="md"
            fontWeight="bold"
            color="purple.700"
            letterSpacing="wide"
          >
            {t("Coefficient Settings")}
          </Text>
        </HStack>

        {/* Filters Section */}
        <Flex alignItems="center" gap={2}>
          <ClearFilter gridRef={gridRef} />
          <QuickFilter gridRef={gridRef} />
        </Flex>
        
        {/* Toujours afficher le bouton d'ajout */}
        <CoefficientSidebar />
      </Flex>
    </Box>
  );
};

export default HeaderActions;