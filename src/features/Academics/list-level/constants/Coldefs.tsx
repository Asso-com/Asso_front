import { type ColDef } from "ag-grid-community";
import ActiveCellRender from "../components/column-actions/ActiveCellRender";
const LevelColumnDefs: ColDef[] = [
  {
    headerName: "Category Name",
    field: "categoryName",
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
    minWidth: 250,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Level",
    field: "name",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 2,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Order",
    field: "order",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 2,
    cellStyle: { textAlign: "left" },
  },
];

export default LevelColumnDefs;
