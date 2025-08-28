import { type ColDef } from "ag-grid-community";
import { convertUTCToLocalDisplay } from "@utils/timeUtils";

const VerificationColDefs: ColDef[] = [
  {
    headerName: "Email",
    field: "userEmail",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 170,
    flex: 1.2,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "First Name",
    field: "userFirstName",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 0.8,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Last Name",
    field: "userLastName",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 0.8,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Created At",
    field: "createdAt",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 2,
    minWidth: 185,

    cellStyle: { textAlign: "left" },
    valueFormatter: (params) => {
      if (!params.value) return "";
      return convertUTCToLocalDisplay(params.value, {
        format: "medium",
      });
    },
  },
  {
    headerName: "Expires At",
    field: "expiresAt",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 2,
    minWidth: 185,

    cellStyle: { textAlign: "left" },
    valueFormatter: (params) => {
      if (!params.value) return "";
      return convertUTCToLocalDisplay(params.value, {
        format: "medium",
      });
    },
  },
  {
    headerName: "OTP Code",
    field: "otpCode",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 120,

    flex: 0.3,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Sent to Number",
    field: "sentToNumber",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
];

export default VerificationColDefs;
