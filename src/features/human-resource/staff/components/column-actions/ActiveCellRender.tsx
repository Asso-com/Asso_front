import React from "react";
import { Box } from "@chakra-ui/react";
import { MdOutlineToggleOn } from "react-icons/md";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import type { ICellRendererParams } from "ag-grid-community";

const ActiveCellRender: React.FC<ICellRendererParams> = ({ data }) => {
  const isActive = data?.active;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <GenericIconButtonWithTooltip
        icon={<MdOutlineToggleOn size={36} />}
        label={isActive ? "Active" : "Inactive"}
        ariaLabel="toggle_status_btn"
        variant="none"
        color={isActive ? "secondary.500" : "blackAlpha.600"}
        size="sm"
      />
    </Box>
  );
};

export default ActiveCellRender;
