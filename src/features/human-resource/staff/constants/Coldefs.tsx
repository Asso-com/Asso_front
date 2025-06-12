import { type ColDef } from "ag-grid-community";
 
const StaffColumnDefs: ColDef[] = [
  
  {
    headerName: "First Name",
    field: "firstName",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Last Name",
    field: "lastName",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 150,
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
    minWidth: 120,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Job Category",
    field: "jobCategory",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Join Date",
    field: "dateOfJoining",
    sortable: true,
    filter: "agDateColumnFilter",
    resizable: true,
    minWidth: 120,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Leave Date",
    field: "dateOfLeaving",
    sortable: true,
    filter: "agDateColumnFilter",
    resizable: true,
    minWidth: 120,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Salary",
    field: "basicSalary",
    sortable: true,
    filter: "agNumberColumnFilter",
    resizable: true,
    minWidth: 100,
    flex: 1,
    cellStyle: { textAlign: "right" },
    valueFormatter: (params) => {
      return params.value ? `$${params.value.toLocaleString()}` : '';
    }
  },
  
  
];

export default StaffColumnDefs;