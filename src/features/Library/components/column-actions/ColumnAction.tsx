import React, { useState } from "react";
import { Flex} from "@chakra-ui/react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import type { ICellRendererParams } from "ag-grid-community";
import type { Book } from "@features/Library/types";
import type { RootState } from "@store/index";
import { confirmAlert } from "@components/shared/confirmAlert";
import { useSelector } from "react-redux";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import GenericModal from "@components/ui/GenericModal";
import BooksDetails from "./BooksDetails";
import EditBook from "../sidebar/EditBook";
import { useDeleteBook } from "@features/Library/hooks/useDeleteBook";


const ColumnAction: React.FC<ICellRendererParams<Book>> = (params) => {
  const book = params.data;
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
    const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { mutateAsync: deleteBook } = useDeleteBook(associationId);

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: "Delete Confirmation",
      text: "You won't be able to revert this!",
    });
    if (isConfirmed) {
      try {
        await deleteBook(book!.id);
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };
  if (!book) {
    return null;
  }


  const toggleViewModal = () => setIsViewOpen((prev) => !prev);
  const toggleEditSidebar = () => setIsEditOpen((prev) => !prev);

  const handleEdit = () => {
    toggleEditSidebar();
  };

  return (
    <>
      <Flex align="center" justify="center" gap={2} height="100%">
        <GenericIconButtonWithTooltip
          icon={<FiEye size={18} />}
          label="View Details"
          ariaLabel="view_book_details"
          variant="ghost"
          colorScheme="blue"
          size="sm"
          onClick={toggleViewModal}
        />

        <GenericIconButtonWithTooltip
          icon={<FiEdit size={18} />}
          label="Edit Book"
          ariaLabel="edit_book"
          variant="ghost"
          colorScheme="green"
          size="sm"
          onClick={handleEdit}
        />

        <GenericIconButtonWithTooltip
          icon={<FiTrash size={18} />}
          label="Delete Book"
          ariaLabel="delete_book"
          variant="ghost"
          colorScheme="red"
          size="sm"
          onClick={handleDelete}
        />
      </Flex>

      <GenericModal 
        isOpen={isViewOpen} 
        onClose={toggleViewModal} 
        title="Book Details" 
        size="2xl"
      >
        <BooksDetails book={book} />
      </GenericModal>

      <EditBook
        bookData={book}
        isOpen={isEditOpen}
    onClose={() => {
            setIsEditOpen(false);

          }}
      />
    </>
  );
};

export default ColumnAction;