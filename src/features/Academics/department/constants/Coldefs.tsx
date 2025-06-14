import { type ColDef } from "ag-grid-community";
import { Badge, Flex } from "@chakra-ui/react";
import ActiveCellRender from "../components/column-actions/ActiveCellRender";
import StandardColumnCellRender from "@components/shared/shared-columns/StandardColumnCellRender";
const DepartmentColumnDefs: ColDef[] = [
  {
    headerName: "Code",
    field: "code",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 120,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Department",
    field: "name",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 2,
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

export default DepartmentColumnDefs;
