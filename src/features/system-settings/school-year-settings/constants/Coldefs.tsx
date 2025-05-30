import { type ColDef } from "ag-grid-community";
import { format } from "date-fns"; // if you use date formatting

const academicYearColumnDefs: ColDef[] = [
  {
    headerName: "Code",
    field: "code",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
  },
  {
    headerName: "Description",
    field: "description",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
  },
  {
    headerName: "Active",
    field: "active",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
  },
  {
    headerName: "Day of Week",
    field: "dayOfWeek",
    sortable: true,
    filter: "agNumberColumnFilter",
    resizable: true,
  },
  {
    headerName: "Start Date",
    field: "startDate",
    sortable: true,
    filter: "agDateColumnFilter",
    resizable: true,
    valueFormatter: ({ value }) =>
      value ? format(new Date(value), "yyyy-MM-dd") : "",
  },
  {
    headerName: "End Date",
    field: "endDate",
    sortable: true,
    filter: "agDateColumnFilter",
    resizable: true,
    valueFormatter: ({ value }) =>
      value ? format(new Date(value), "yyyy-MM-dd") : "",
  },
];

export default academicYearColumnDefs;
