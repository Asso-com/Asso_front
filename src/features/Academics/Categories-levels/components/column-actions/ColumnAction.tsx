import { Box, Flex } from "@chakra-ui/react"
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip"
import { EditIcon } from "@chakra-ui/icons"
import { useDispatch } from "react-redux"
import { showToast } from "@store/toastSlice"
import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md"
import type { ICellRendererParams } from "ag-grid-community"
// import type { RootState } from "@store/index"

// type ModalType = "showDetails" | "editModal"

const ColumnAction: React.FC<ICellRendererParams> = params => {
  // const [modalsState, setModalsState] = useState<Record<ModalType, boolean>>({
  //   showDetails: false,
  //   editModal: false,
  // })
  // const associationId = useSelector(
  //   (state: RootState) => state.authSlice.associationId
  // )

  const dispatch = useDispatch()

  // const toggleModal = (modal: ModalType) => {
  //   setModalsState(prevState => ({
  //     ...prevState,
  //     [modal]: !prevState[modal],
  //   }))
  // }

  const handleActivatePeriod = () => {
    if (params?.data?.active) {
      dispatch(
        showToast({
          title: "Information",
          message: "You cannot deactivate an active Categorie Level",
          type: "info",
        })
      )
    } else {
    }
  }

  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <Box>
        <GenericIconButtonWithTooltip
          icon={
            params?.data?.active ? (
              <MdOutlineToggleOn size={36} />
            ) : (
              <MdOutlineToggleOff size={36} />
            )
          }
          label={params?.data?.active ? "Activate" : "Deactivate"}
          ariaLabel={"activate_btn"}
          variant="none"
          color={params?.data?.active ? "green" : "gray"}
          size="sm"
          onClick={handleActivatePeriod}
        />
      </Box>

      <GenericIconButtonWithTooltip
        icon={<EditIcon boxSize={5} />}
        label="Edit"
        ariaLabel="edit_btn"
        variant="ghost"
        colorScheme="green"
        size="sm"
        // onClick={() => toggleModal("editModal")}
      />
    </Flex>
  )
}

export default ColumnAction
