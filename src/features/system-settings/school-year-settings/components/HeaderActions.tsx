import { Box, Text, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ClearFilter from "@components/shared/ClearFilter";
import QuickFilter from "@components/shared/QuickFilter";
import PeriodSidebar from "./sidebar/PeriodSidebar";

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
        <Text fontSize="md" fontWeight="bold">
          {t("School Year List")}
        </Text>

        {/* Filters Section */}
        <Flex alignItems="center" gap={2}>
          <ClearFilter gridRef={gridRef} />
          <QuickFilter gridRef={gridRef} />
        </Flex>
        <PeriodSidebar />
      </Flex>
    </Box>
  );
};

export default HeaderActions;
