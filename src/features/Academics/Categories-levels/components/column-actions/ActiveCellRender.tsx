import { Box } from "@chakra-ui/react";
import { MdOutlineToggleOn } from "react-icons/md";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import type { ICellRendererParams } from "ag-grid-community";
import { useSelector } from "react-redux";
import useToggleActive from "../../hooks/useToggelActive";
import type { RootState } from "@store/index";

const ActiveCellRender: React.FC<ICellRendererParams> = ({ data }) => {
  const isActive = data?.active;
  const categoryId = data?.id;

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: toggleStatus } = useToggleActive(associationId);

  const handleToggleStatus = async () => {
    if (!categoryId) return;
    await toggleStatus(categoryId);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <GenericIconButtonWithTooltip
        icon={<MdOutlineToggleOn size={36} />}
        label={isActive ? "Active" : "Inactive"}
        ariaLabel="toggle_status_btn"
        variant="none"
        color={isActive ? "secondary.500" : "blackAlpha.600"}
        size="sm"
        onClick={handleToggleStatus}
      />
    </Box>
  );
};

export default ActiveCellRender;
