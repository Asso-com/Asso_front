import { type ColDef } from "ag-grid-community";
import { format } from "date-fns";
const academicWeeksColumnDefs: ColDef[] = [
  {
    headerName: "Week Number",
    field: "weekNumber",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 120,
  },
  {
    headerName: "Start Date",
    field: "startDate",
    sortable: true,
    filter: "agDateColumnFilter",
    resizable: true,
    minWidth: 150,
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
    valueFormatter: ({ value }) =>
      value ? format(new Date(value), "yyyy-MM-dd") : "",
    cellStyle: { textAlign: "center" },
  },
];

export default academicWeeksColumnDefs;
