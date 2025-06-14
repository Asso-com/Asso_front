import { Button } from "@chakra-ui/react";
import RigthSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormContent from "./FormContent";

import type { FormContentRef } from "./FormContent";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import useCreateLevel from "../../hooks/useCreateLevel";
import type { NewLevel } from "../../types";

const LevelSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: createLevel, isPending } = useCreateLevel(associationId);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const formRef = useRef<FormContentRef>(null);

  const handleSubmitForm = async () => {
    const values = await formRef.current?.submitForm();
    if (values) {
      const newLevel: NewLevel = {
        name: String(values.name),
        categoryId: Number(values.categoryId),
        active: Boolean(values.active),
      };
      try {
        await createLevel(newLevel);
        handleCloseSidebar();
      } catch (error) {
        console.error("Create level failed", error);
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
        {t("Add Level")}
      </Button>

      <RigthSidebar
        isOpen={sidebarOpen}
        title={t("Add Level")}
        onClose={handleCloseSidebar}
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmitForm}
            onClose={handleCloseSidebar}
            isLoading={isPending}
          />
        }
      >
        <FormContent ref={formRef} />
      </RigthSidebar>
    </>
  );
};

export default LevelSidebar;
