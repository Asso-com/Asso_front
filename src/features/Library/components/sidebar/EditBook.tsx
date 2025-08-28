import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import RightSidebar from "@components/shared/RigthSidebar";
import SidebarButtonsActions from "@components/shared/SidebarButtonsActions";

import { FormContent } from "./FormContent";
import type { FormContentRef } from "./FormContent";
import { useUpdateBook } from "@features/Library/hooks/useUpdateBook";
import type { RootState } from "@store/index";
import type { Book } from "../../types";

interface EditBookProps {
  bookData: Book;
  isOpen: boolean;
  onClose: () => void;
}

const EditBook: React.FC<EditBookProps> = ({
  bookData,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const formRef = useRef<FormContentRef>(null);
  const updateBookMutation = useUpdateBook(associationId);

  const handleSubmit = async () => {
  if (!formRef.current) return;
  if (!formRef.current.isDirty()) return;

  const formData = await formRef.current.submitForm();
  if (!formData) return;

  try {
    await updateBookMutation.mutateAsync({
      bookId: bookData.id,
      data: formData,
    });
    onClose();
  } catch (error) {
    console.error("Error updating book:", error);
  }
};


  return (
    <RightSidebar
      isOpen={isOpen}
      title={t("Edit Book")}
      onClose={onClose}
      size="lg"
      footer={
        <SidebarButtonsActions
          onSubmitForm={handleSubmit}
          onClose={onClose}
          isLoading={updateBookMutation.isPending}
        />
      }
    >
      <FormContent 
        ref={formRef} 
        editData={bookData} 
        isEditMode={true}
        key={`edit-${bookData.id}`}
      />
    </RightSidebar>
  );
};

export default EditBook;