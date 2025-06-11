import { Flex } from "@chakra-ui/react"
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip"
import { useDispatch } from "react-redux"
import { showToast } from "@store/toastSlice"
import type { ICellRendererParams } from "ag-grid-community"
import { MdDelete, MdEdit } from "react-icons/md"

// type ModalType = "showDetails" | "editModal"

const ColumnAction: React.FC<ICellRendererParams> = () => {
  // const [modalsState, setModalsState] = useState<Record<ModalType, boolean>>({
  //   showDetails: false,
  //   editModal: false,
  // })

  const dispatch = useDispatch()

  // const toggleModal = (modal: ModalType) => {
  //   setModalsState(prevState => ({
  //     ...prevState,
  //     [modal]: !prevState[modal],
  //   }))
  // }

  const handleDelete = () => {
    // Success Toast
    // dispatch(
    //   showToast({
    //     title: "Deleted",
    //     message: "Item deleted successfully.",
    //     type: "success",
    //   })
    // );

    // dispatch(
    //   showToast({
    //     title: "Delete Failed",
    //     message: "An error occurred while deleting the item.",
    //     type: "error",
    //   })
    // );

    // // Info Toast
    // dispatch(
    //   showToast({
    //     title: "Information",
    //     message: "Delete operation has been logged.",
    //     type: "info",
    //   })
    // );

    // Warning Toast
    dispatch(
      showToast({
        title: "Warning",
        message: "This action cannot be undone.",
        type: "warning",
      })
    )
  }

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <GenericIconButtonWithTooltip
        icon={<MdEdit size={22} />}
        label="Edit"
        ariaLabel="edit_btn"
        variant="ghost"
        colorScheme="green"
        size="sm"
        // onClick={() => toggleModal("editModal")}
      />
      <GenericIconButtonWithTooltip
        icon={<MdDelete size={22} />}
        label="Delete"
        ariaLabel="delete_btn"
        variant="ghost"
        colorScheme="red"
        size="sm"
        onClick={handleDelete}
      />
    </Flex>
  )
}

export default ColumnAction
