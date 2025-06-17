import { Button } from "@chakra-ui/react";
import RigthSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useCreateCoefficients from "../../hooks/useCreateCoefficients"; 
import FormContent from "./FormContent";
import type { FormContentRef } from "./FormContent";

const CoefficientSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  const { mutateAsync: createCoefficient } = useCreateCoefficients(associationId);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const formRef = useRef<FormContentRef>(null);

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm();
    if (values) {
      try {
        await createCoefficient(values);
        handleCloseSidebar();
      } catch (error) {
        console.error("Error creating coefficient:", error);
      }
    }
  };

  return (
    <>
      <Button
        size="md"
        fontSize="sm"
        variant="outline"
        colorScheme="primary"
        onClick={handleOpenSidebar}
      >
        {t("Add Coefficient")}
      </Button>

      <RigthSidebar
        isOpen={sidebarOpen}
        title={t("Add New Coefficient")}
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
    </>
  );
};

export default CoefficientSidebar;