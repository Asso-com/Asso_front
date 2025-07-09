import { useEffect, useRef, useState, useMemo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdBlock } from "react-icons/md";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import { mockSessions } from "./data/MockData";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import HeaderActions from "./components/HeaderActions";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import type{ Session } from "./types/sessions.types";
import { SessionDetailsCell, StudentsCell, ActionsCell } from "./components/SessionCells";

const ListStudentsContainer = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      setIsGridInitialized(true);
    }
  }, [gridRef]);

  const totalSessions = mockSessions.length;
  const upcomingSessions = mockSessions.filter((s) => s.status === "upcoming").length;

  const handleEdit = (session: Session) => console.log("Edit", session);
  const handleDelete = (session: Session) => console.log("Delete", session);

  const colDefs = useMemo(
    () => [
      {
        headerName: "Session",
        field: "title",
        flex: 1,
        minWidth: 400,
        autoHeight: true,
        cellRenderer: (params: any) => <SessionDetailsCell data={params.data} />,
      },
      {
        headerName: "Participants",
        field: "students",
        flex: 1,
        minWidth: 300,
        autoHeight: true,
        cellRenderer: (params: any) => <StudentsCell students={params.data.students} />,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "8px",
          textAlign: "left",
        }),
      },
      {
        headerName: "Actions",
        field: "actions",
        width: 120,
        pinned: "right",
        cellRenderer: (params: any) => (
          <ActionsCell data={params.data} onEdit={handleEdit} onDelete={handleDelete} />
        ),
      },
    ],
    [],
  );

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
        <StatsHorizontal
          icon={HiOutlineOfficeBuilding}
          color="blue.500"
          stats={totalSessions.toString()}
          statTitle="Total Sessions"
          borderLeft="6px solid"
          borderColor="blue.500"
        />
        <StatsHorizontal
          icon={MdBlock}
          color="orange.500"
          stats={upcomingSessions.toString()}
          statTitle="Upcoming Sessions"
          borderLeft="6px solid"
          borderColor="orange.500"
        />
      </SimpleGrid>

      {isGridInitialized && (
        <Box flexShrink={0} _dark={{ bg: "gray.900" }} py={1} px={1} boxShadow="sm">
          <HeaderActions searchTerm={searchTerm} onSearchChange={setSearchTerm} filterType={filterType} onFilterChange={setFilterType} />
        </Box>
      )}

      <CustomAgGrid
        ref={gridRef}
        rowData={mockSessions}
        colDefs={colDefs}
        pagination={true}
        paginationPageSize={10}
        rowHeight={200}
        onGridReady={() => setIsGridInitialized(true)}
      />
    </Box>
  );
};

export default ListStudentsContainer;