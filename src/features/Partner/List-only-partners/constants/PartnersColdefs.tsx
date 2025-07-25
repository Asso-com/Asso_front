import type { ColDef } from "ag-grid-community";
import ToggelActive from "../components/ToggelActive";
import { convertUTCToLocalDisplay } from "@utils/timeUtils";

const PartnersColdefs: ColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "left" },
  },
  {
    field: "associationIdentifier",
    headerName: "Identifier",
    width: 200,
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "left" },
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "left" },
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 200,
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "left" },
  },
  {
    field: "participationCoefficient",
    headerName: "Participation Coeff.",
    width: 200,
    filter: "agNumberColumnFilter",
    cellStyle: { textAlign: "left" },
  },
  {
    field: "assiduityCoefficient",
    headerName: "Assiduity Coeff.",
    width: 200,
    filter: "agNumberColumnFilter",
    cellStyle: { textAlign: "left" },
  },
  {
    field: "quizCoefficient",
    headerName: "Quiz Coeff.",
    width: 200,
    filter: "agNumberColumnFilter",
    cellStyle: { textAlign: "left" },
  },
  {
    field: "delayBeforeAttendance",
    headerName: "Delay Before Attendance",
    width: 250,
    filter: "agNumberColumnFilter",
    valueFormatter: (params) => `${params.value} minutes`,
    cellStyle: { textAlign: "left" },
  },
  {
    field: "currency",
    headerName: "Currency",
    width: 150,
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "left" },
  },
  {
    field: "currencySymbol",
    headerName: "Symbol",
    width: 150,
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "center" },
  },
  {
    field: "joinedDate",
    headerName: "Joined Date",
    width: 200,
    filter: "agDateColumnFilter",
    cellStyle: { textAlign: "center" },
    valueFormatter: (params) => {
      if (!params.value) return "";
      return convertUTCToLocalDisplay(params.value, {
        format: "medium",
      });
    },
  },
  {
    field: "address",
    headerName: "Address",
    width: 300,
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Active",
    field: "active",
    sortable: true,
    resizable: true,
    minWidth: 100,
    maxWidth: 120,
    cellRenderer: ToggelActive,
    pinned: "left",
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
];

export default PartnersColdefs;
