import { type ColDef } from "ag-grid-community";
import { Badge } from "@chakra-ui/react";
const CategorieLevelColumnDefs: ColDef[] = [

  {
    headerName: "Categorie",
    field: "name",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 2,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Description",
    field: "description",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 2,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Active",
    field: "active",
    sortable: true,
    resizable: true,
    minWidth: 100,
    maxWidth: 120,
    cellRenderer: ({ value }: any) => (
      <Badge
        colorScheme={value ? "green" : "red"}
        px={2}
        py={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={2}
      >
        {value ? "Yes" : "No"}
      </Badge>
    ),
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
];

export default CategorieLevelColumnDefs;
