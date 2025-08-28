import {
  Box,
  Text,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ClearFilter from "@components/shared/ClearFilter";
import QuickFilter from "@components/shared/QuickFilter";
import { MdSchool } from "react-icons/md";

const SessionHeaderActions = ({ gridRef }: any) => {
  const { t } = useTranslation();

  const borderColor = useColorModeValue("blue.100", "blue.300");
  const iconColor = useColorModeValue("blue.600", "blue.300");
  const textColor = useColorModeValue("blue.800", "blue.100");
  const badgeBg = useColorModeValue("blue.50", "blue.900");
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
          bg={badgeBg}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Icon as={MdSchool} boxSize={5} color={iconColor} />
          <Text fontSize="lg" fontWeight="semibold" color={textColor}>
            {t("Sessions")}
          </Text>
        </HStack>

        <Flex alignItems="center" gap={2}>
          <ClearFilter gridRef={gridRef} />
          <QuickFilter gridRef={gridRef} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default SessionHeaderActions;
