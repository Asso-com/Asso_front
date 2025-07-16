import type { ColDef } from "ag-grid-community";
import EvaluationCell from "../components/attandance-session-date/EvaluationCell";

const AttandanceColDefs: ColDef[] = [
  {
    headerName: "Registration Id",
    field: "registrationId",
    width: 200,
    pinned: "left",
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "FirstName",
    field: "firstName",
    width: 200,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "LastName",
    field: "lastName",
    width: 200,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Evaluation",
    field: "evaluation",
    width: 160,
    cellRenderer: EvaluationCell,
    sortable: true,
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Email",
    field: "email",
    width: 200,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Phone Number",
    field: "phoneNumber",
    width: 200,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Remark",
    field: "remark",
    width: 200,
  },
  {
    headerName: "Justification",
    field: "justification",
    width: 150,
  },
];
export default AttandanceColDefs;
