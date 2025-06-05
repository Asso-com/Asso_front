import { type ColDef } from "ag-grid-community";
import { format } from "date-fns";
import ToggelStatus from "../components/column-actions/ToggelStatus";

const academicYearColumnDefs: ColDef[] = [
  {
    headerName: "Code",
    field: "code",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 120,
    flex: 1,
  },
  {
    headerName: "Description",
    field: "description",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 2,
  },
  {
     headerName: "Active",
    field: "active",
    sortable: true,
    resizable: true,
    minWidth: 100,
    maxWidth: 120,
    cellRenderer: ToggelStatus,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    headerName: "Day of Week",
    field: "dayOfWeek",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Start Date",
    field: "startDate",
    sortable: true,
    filter: "agDateColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    valueFormatter: ({ value }) =>
      value ? format(new Date(value), "yyyy-MM-dd") : "",
    cellStyle: { textAlign: "center" },
  },
  {
    headerName: "End Date",
    field: "endDate",
    sortable: true,
    filter: "agDateColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    valueFormatter: ({ value }) =>
      value ? format(new Date(value), "yyyy-MM-dd") : "",
    cellStyle: { textAlign: "center" },
  },
];

export default academicYearColumnDefs;
