import { type ColDef } from "ag-grid-community";

const VerificationColDefs: ColDef[] = [
  {
    headerName: "Created At",
    field: "createdAt", 
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Expires At",
    field: "expiresAt", 
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 120,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "OTP Code",
    field: "otpCode", 
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 2,
    cellStyle: { textAlign: "left" },
    },
    {
    headerName: "Sent to Number",
    field: "sentToNumber", 
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 2,
    cellStyle: { textAlign: "left" },
  
  },
];

export default VerificationColDefs;