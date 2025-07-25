import { Flex } from "@chakra-ui/react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { MdDelete } from "react-icons/md";
import type { ICellRendererParams } from "ag-grid-community";
import type { RootState } from "@store/index";
import { confirmAlert } from "@components/shared/confirmAlert";
import { useSelector } from "react-redux";
import useDeleteVerficationCode from "../../hooks/useDeleteVerificationCode";


const ColumnAction: React.FC<ICellRendererParams> = (params) => {



  const { mutateAsync: deleteVerificationCode } = useDeleteVerficationCode();

  const handleDelete = async () => {
    const isConfirmed = await confirmAlert({
      title: "Delete Confirmation",
      text: "You won't be able to revert this!",
    });
    if (isConfirmed) {
      try {
        deleteVerificationCode(params.data.id);
      } catch (error) {
      }
    }
  };

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <GenericIconButtonWithTooltip
        icon={<MdDelete size={22} />}
        label="Delete"
        ariaLabel="delete_btn"
        variant="ghost"
        colorScheme="red"
        size="sm"
        onClick={handleDelete}
        disabled={params.data.standard}
      />
    </Flex>
  );
};

export default ColumnAction;
