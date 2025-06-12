import { Box } from "@chakra-ui/react"
import { MdOutlineToggleOn } from "react-icons/md"
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip"
import { useDispatch, useSelector } from "react-redux"
import type { ICellRendererParams } from "ag-grid-community"
import type { RootState } from "@store/index"
import useActiveAcademicPeriod from "../../hooks/useActiveAcademicPeriod"
import { showToast } from "@store/toastSlice"

const ToggelStatus: React.FC<ICellRendererParams> = ({ data }) => {
  const isActive = data?.active
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  )

  const { mutateAsync: activateAcademicPeriod } =
    useActiveAcademicPeriod(associationId)

  const dispatch = useDispatch()

  const handleActivatePeriod = () => {
    if (data?.active) {
      dispatch(
        showToast({
          title: "Information",
          message: "You cannot deactivate an active Academic Period",
          type: "info",
        })
      )
    } else {
      activateAcademicPeriod(data?.id)
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <GenericIconButtonWithTooltip
        icon={<MdOutlineToggleOn size={36} />}
        label={isActive ? "Active" : "Inactive"}
        ariaLabel="toggle_status_btn"
        variant="none"
        color={isActive ? "secondary.500" : "blackAlpha.600"}
        size="sm"
        onClick={handleActivatePeriod}
      />
    </Box>
  )
}

export default ToggelStatus
