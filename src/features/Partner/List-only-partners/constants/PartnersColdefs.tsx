import type { ColDef } from "ag-grid-community";

const PartnersColdefs: ColDef[] = [
  {
    field: "name",
    headerName: "Association Name",
    width: 300,
    filter: "agTextColumnFilter",
    pinned: "left",
    cellStyle: {
      textAlign: "left",
    },
  },
  {
    field: "associationIdentifier",
    headerName: "Identifier",
    width: 150,
    filter: "agTextColumnFilter",
  },
  {
    field: "joinedDate",
    headerName: "Creation Date",
    width: 140,
    filter: "agDateColumnFilter",
    cellStyle: {
      textAlign: "center",
    },
  },
];
export default PartnersColdefs;
