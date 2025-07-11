import { Box, Text, Flex, HStack, Icon } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ClearFilter from "@components/shared/ClearFilter";
import QuickFilter from "@components/shared/QuickFilter";
import ReunionSidebar from "./sidebar/ListReunionSidebar";

import { MdGroups } from "react-icons/md";

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
          bg="green.50"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="green.100"
        >
          <Icon as={MdGroups} boxSize={5} color="green.600" />
          <Text
            fontSize="md"
            fontWeight="bold"
            color="green.700"
            letterSpacing="wide"
          >
            {t("List of family meetings")}
          </Text>
        </HStack>

        <Flex alignItems="center" gap={2}>
          <ClearFilter gridRef={gridRef} />
          <QuickFilter gridRef={gridRef} />
        </Flex>

        <ReunionSidebar />
      </Flex>
    </Box>
  );
};

export default HeaderActions;
