import React from "react";
import { Box } from "@chakra-ui/react";
import { MdOutlineToggleOn } from "react-icons/md";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { useSelector } from "react-redux";
import type { ICellRendererParams } from "ag-grid-community";
import type { RootState } from "@store/index";
import useActiveLevel from "../../hooks/useActiveLevel";

const ActiveCellRender: React.FC<ICellRendererParams> = ({ data }) => {
  const isActive = data?.active;
  const departmentId = data?.id;

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: toggleStatus } = useActiveLevel(associationId);

  const handleToggleStatus = async () => {
    if (!departmentId) return;

    await toggleStatus(departmentId);
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
