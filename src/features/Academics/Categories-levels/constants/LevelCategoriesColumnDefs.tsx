import { Badge, Flex } from "@chakra-ui/react";
import { type ColDef } from "ag-grid-community";
const LevelCategoriesColumnDefs: ColDef[] = [
  {
    headerName: "name",
    field: "name",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 250,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "description",
    field: "description",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 120,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    field: "shared",
    sortable: true,
    resizable: true,
    minWidth: 100,
    maxWidth: 120,
    cellRenderer: ({ value }: any) => (
      <Flex gap={2} alignItems={"center"} p={2} height={"100%"}>
        <Badge
          colorScheme={value ? "blue" : "gray"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          fontSize="sm"
          variant="outline"
          px={2}
          maxH="25px"
        >
          {value ? "Yes" : "No"}
        </Badge>
      </Flex>
    ),
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    headerName: "Active",
    field: "active",
    sortable: true,
    resizable: true,
    minWidth: 100,
    maxWidth: 120,
    // cellRenderer: ActiveCellRender,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
];

export default LevelCategoriesColumnDefs;
