import { Flex } from "@chakra-ui/react"
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip"
import { EditIcon } from "@chakra-ui/icons"

import type { ICellRendererParams } from "ag-grid-community"

const ColumnAction: React.FC<ICellRendererParams> = () => {
  return (
    <Flex align="center" justify="center" gap={2} height="100%">
      <GenericIconButtonWithTooltip
        icon={<EditIcon boxSize={5} />}
        label="Edit"
        ariaLabel="edit_btn"
        variant="ghost"
        colorScheme="green"
        size="sm"
      />
    </Flex>
  )
}

export default ColumnAction
