import { Box, Text, Flex, HStack, Icon, Button } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ClearFilter from "@components/shared/ClearFilter";
import QuickFilter from "@components/shared/QuickFilter";
import RigthSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import useCreateAnnonce from "../../hooks/useCreateAnnonce";
import FormContent from "../forms/FormContent";
import { FaBullhorn } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface HeaderActionsProps {
  gridRef: any;
}

const HeaderActions = ({ gridRef }: HeaderActionsProps) => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: any) => state.authSlice.associationId
  );
  const { mutateAsync: createAnnonce } = useCreateAnnonce(associationId);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const formRef = useRef<any>(null);

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm();
    if (values) {
      try {
        await createAnnonce({
          ...values,
          associationId: associationId,
        });
        handleCloseSidebar();
      } catch (error) {
        console.error("Error creating annonce:", error);
      }
    }
  };

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
          bg="blue.50"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="blue.100"
        >
          <Icon as={FaBullhorn} boxSize={5} color="blue.500" />
          <Text
            fontSize="md"
            fontWeight="bold"
            color="blue.700"
            letterSpacing="wide"
          >
            {t("Annonces")}
          </Text>
        </HStack>

        <Flex alignItems="center" gap={2}>
          <ClearFilter gridRef={gridRef} />
          <QuickFilter gridRef={gridRef} />
          <Button
            size="md"
            fontSize="sm"
            variant="outline"
            colorScheme="primary"
            onClick={handleOpenSidebar}
          >
            {t("Add Annonce")}
          </Button>
        </Flex>
      </Flex>

      <RigthSidebar
        isOpen={sidebarOpen}
        title="Add New Annonce"
        onClose={handleCloseSidebar}
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmitForm}
            onClose={handleCloseSidebar}
          />
        }
      >
        <FormContent ref={formRef} />
      </RigthSidebar>
    </Box>
  );
};

export default HeaderActions;