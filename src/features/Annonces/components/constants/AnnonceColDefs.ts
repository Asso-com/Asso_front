import { formatDateOnly } from "@utils/timeUtils";
import type { ColDef } from "ag-grid-community";

const AnnonceColDefs: ColDef[] = [
  {
    headerName: "Titre",
    field: "titre",
    flex: 1,
    minWidth: 200,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Description",
    field: "description",
    flex: 2,
    minWidth: 300,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Type",
    field: "type",
    width: 130,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Created At",
    field: "createdAt",
    width: 180,
    valueFormatter: (params) => {
      if (!params.value) return "";
      return formatDateOnly(params.value, {
        format: "medium",
      });
    },
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Updated At",
    field: "updatedAt",
    width: 180,
    valueFormatter: (params) => {
      if (!params.value) return "";
      return formatDateOnly(params.value, {
        format: "medium",
      });
    },
    cellStyle: { textAlign: "left" },
  },
]
export default AnnonceColDefs;