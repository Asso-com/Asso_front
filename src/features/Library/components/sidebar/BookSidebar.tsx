import { Button } from "@chakra-ui/react";
import RightSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormContent, type FormContentRef } from "./FormContent";
import { useCreateBook } from "@features/Library/hooks/useCreateBook";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { FiPlus } from "react-icons/fi";

const BookSidebar = () => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  const formRef = useRef<FormContentRef>(null);
  const { mutateAsync: createBook, isPending } = useCreateBook(associationId);

  const handleSubmitForm = async () => {
    if (!formRef.current) return;

    try {
      const values = await formRef.current.submitForm();
      if (!values) return;

      const payload = {
        ...values,
        associationId,
        available: true,
        isActive: true,
        postDate: new Date().toISOString().split('T')[0],
      };

      await createBook(payload);
      formRef.current.resetForm();
      handleCloseSidebar();
    } catch (error: any) {
      console.error("Error creating book:", error);
    }
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
    handleCloseSidebar();
  };

  return (
    <>
      <Button
        px={6}
        size="md"
        fontSize="sm"
        variant="outline"
        colorScheme="primary"
        onClick={handleOpenSidebar}
        leftIcon={<FiPlus />}
      >
        {t("Add Book")}
      </Button>

      <RightSidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        title={t("Create New Book")}
        footer={
          <SidebarButtonsActions
            onSubmitForm={handleSubmitForm}
            onClose={handleCancel}
            isLoading={isPending}
          />
        }
      >
        <FormContent ref={formRef} />
      </RightSidebar>
    </>
  );
};

export default BookSidebar;