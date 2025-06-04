import { type ColDef } from "ag-grid-community";
import { Badge } from "@chakra-ui/react";
const DepartmentColumnDefs: ColDef[] = [
  {
    headerName: "Code",
    field: "code",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 120,
    flex: 1,
  },
  {
    headerName: "Department",
    field: "name",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 2,
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

export default DepartmentColumnDefs;
