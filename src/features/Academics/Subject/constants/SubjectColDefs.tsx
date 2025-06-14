import StandardColumnCellRender from "@components/shared/shared-columns/StandardColumnCellRender";
import { type ColDef } from "ag-grid-community";
const SubjectColDefs: ColDef[] = [
  {
    headerName: "Department",
    field: "departmentName",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
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
    headerName: "Name",
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
];

export default SubjectColDefs;
