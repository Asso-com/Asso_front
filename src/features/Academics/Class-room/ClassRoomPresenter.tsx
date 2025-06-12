import { useEffect, useRef, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { HiOutlineOfficeBuilding } from "react-icons/hi"; // Better for "ClassRoom"
import { MdBlock } from "react-icons/md"; // Good for "Inactive"
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import ClassRoomColumnDefs from "./constants/Coldefs";
import HeaderActions from "./components/HeaderActions";
import ColumnAction from "./components/column-actions/ColumnAction";

const ClassRoomPresenter = ({
  rows = [],
  total = 0,
  unActiveClassRooms = 0,
}: any) => {
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      setIsGridInitialized(true);
    }
  }, [gridRef.current]);

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={6}>
        <StatsHorizontal
          icon={HiOutlineOfficeBuilding}
          color="blue.500"
          stats={total.toString()}
          statTitle="Total Class Rooms"
          borderLeft="6px solid"
          borderColor="blue.500"
        />
        <StatsHorizontal
          icon={MdBlock}
          color="orange.500"
          stats={unActiveClassRooms.toString()}
          statTitle="Inactive Class Rooms"
          borderLeft="6px solid"
          borderColor="orange.500"
        />
      </SimpleGrid>

      {isGridInitialized && <HeaderActions gridRef={gridRef} />}

      <CustomAgGrid
        ref={gridRef}
        rowData={rows}
        colDefs={[
          ...ClassRoomColumnDefs,
          {
            headerName: "Actions",
            field: "actions",
            cellRenderer: ColumnAction,
            filter: false,
            sortable: false,
            width: 120,
            pinned: "right",
          },
        ]}
        onGridReady={() => setIsGridInitialized(true)}
      />
    </Box>
  );
};

export default ClassRoomPresenter;
