
import React from "react";
import { Box } from "@chakra-ui/react";
import { MdOutlineToggleOn } from "react-icons/md";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import type { ICellRendererParams } from "ag-grid-community";

const ActiveCellRender: React.FC<ICellRendererParams> = ({ data }) => {
  const isActive = data?.isPlanned ?? true;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <GenericIconButtonWithTooltip
        icon={<MdOutlineToggleOn size={36} />}
        label={isActive ? "Planned" : "Done"}
        ariaLabel="toggle_status_btn"
        variant="none"
        color={isActive ? "green.400" : "gray.500"}
        size="sm"
      />
    </Box>
  );
};

export default ActiveCellRender;
