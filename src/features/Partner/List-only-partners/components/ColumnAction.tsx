import { Flex } from "@chakra-ui/react";
import type { ICellRendererParams } from "ag-grid-community";

const ColumnAction: React.FC<ICellRendererParams> = (params) => {
  console.log(params);

  return <Flex align="center" justify="center" gap={2} height="100%"></Flex>;
};

export default ColumnAction;
