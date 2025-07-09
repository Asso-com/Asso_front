import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import type { ICellRendererParams } from "ag-grid-community";
import type { Book } from "@features/Library/types";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import GenericModal from "@components/ui/GenericModal";
import BooksDetails from "./BooksDetails";

const ColumnAction: React.FC<ICellRendererParams<Book>> = (params) => {
  const book = params.data;
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(prev => !prev);

  return (
    <Flex align="center" justify="center" height="100%">
      <GenericIconButtonWithTooltip
        icon={<FiEye size={18} />}
        label="View Details"
        ariaLabel="view_book_details"
        variant="ghost"
        colorScheme="blue"
        size="sm"
        onClick={toggleModal}
      />
      
      <GenericModal
        isOpen={isOpen}
        onClose={toggleModal}
        title={"Book Details"}
        size="2xl"
      >
        <BooksDetails book={book} />
      </GenericModal>
    </Flex>
  );
};

export default ColumnAction;