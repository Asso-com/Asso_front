import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import GenericModal from "@components/ui/GenericModal";
import EditFamily from "../column-actions/EditFamily";


const FamilySidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        colorScheme="blue"
        size="sm"
        leftIcon={<MdPersonAdd />}
        onClick={() => setIsOpen(true)}
      >
        Add Family
      </Button>

      <GenericModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Family"
        size="md"
      >
        <EditFamily onClose={() => setIsOpen(false)} />
      </GenericModal>
    </>
  );
};

export default FamilySidebar;
