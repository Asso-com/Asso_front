import { type ColDef } from "ag-grid-community";

const StaffColumnDefs: ColDef[] = [
  {
    headerName: "Staff Identifier",
    field: "staffIdentifier",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 180,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "First Name",
    field: "firstName",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Last Name",
    field: "lastName",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Email",
    field: "email",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Mobile",
    field: "mobileNumber",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Job Category",
    field: "jobCategory",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Address",
    field: "address",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "City",
    field: "city",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Zip Code",
    field: "zipCode",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "State",
    field: "state",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Comment",
    field: "comment",
    sortable: false,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },

  {
    headerName: "Join Date",
    field: "dateOfJoining",
    sortable: true,
    filter: "agDateColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    cellStyle: { textAlign: "left" },
    valueFormatter: (params) => {
      if (!params.value) return "";
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  {
    headerName: "Leave Date",
    field: "dateOfLeaving",
    sortable: true,
    filter: "agDateColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    cellStyle: { textAlign: "left" },
    valueFormatter: (params) => {
      if (!params.value) return "";
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  {
    headerName: "Salary",
    field: "basicSalary",
    sortable: true,
    filter: "agNumberColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    cellStyle: { textAlign: "right" },
    valueFormatter: (params) => {
      return params.value !== undefined && params.value !== null
        ? `$${params.value.toLocaleString()}`
        : "";
    },
  }
];

export default StaffColumnDefs;
