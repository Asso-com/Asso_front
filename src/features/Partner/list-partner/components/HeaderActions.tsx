import React from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHandshake } from "react-icons/fa";
import ClearFilter from "@components/shared/ClearFilter";
import QuickFilter from "@components/shared/QuickFilter";
import { useTranslation } from "react-i18next";

interface HeaderActionsProps {
  gridRef: React.RefObject<any>;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ gridRef }) => {
  const { t } = useTranslation();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      w="100%"
      p={2}
      bg={bgColor}
      boxShadow="md"
      borderRadius="md"
      border="1px"
      borderColor={borderColor}
    >
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
          <Icon as={FaHandshake} boxSize={5} color="blue.500" />
          <Text
            fontSize="md"
            fontWeight="bold"
            color="blue.700"
            letterSpacing="wide"
          >
            {t("Association List")}
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

export default HeaderActions;
