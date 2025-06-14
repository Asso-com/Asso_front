import { Badge, Flex } from "@chakra-ui/react";
import { type ColDef } from "ag-grid-community";
import ActiveCellRender from "../components/column-actions/ActiveCellRender";
import StandardColumnCellRender from "@components/shared/shared-columns/StandardColumnCellRender";
const LevelCategoriesColumnDefs: ColDef[] = [
  {
    headerName: "name",
    field: "name",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "description",
    field: "description",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 120,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Standard",
    field: "standard",
    sortable: true,
    resizable: true,
    minWidth: 100,
    maxWidth: 120,
    cellRenderer: StandardColumnCellRender,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    headerName: "Active",
    field: "active",
    sortable: true,
    resizable: true,
    minWidth: 100,
    maxWidth: 120,
    cellRenderer: ActiveCellRender,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
];

export default LevelCategoriesColumnDefs;
