import { useEffect, useRef, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import HeaderActions from "./components/HeaderActions";
import BookColDefs from "./constant/Coldefs";
import ColumnAction from "./components/column-actions/ColumnAction";
import { FaBook } from "react-icons/fa";
import type { Book } from "./types";

interface BookListPresenterProps {
  rows: Book[];
  total: number;
}
const BookListPresenter: React.FC<BookListPresenterProps> = ({
  rows = [],
  total = 0,
}) => {
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
          icon={FaBook}
          color="blue.500"
          stats={total.toString()}
          statTitle="Total Books"
          borderLeft="6px solid"
          borderColor="blue.500"
        />
      </SimpleGrid>

      {isGridInitialized && <HeaderActions gridRef={gridRef} />}

      <CustomAgGrid
        ref={gridRef}
        rowData={rows}
        colDefs={[
          ...BookColDefs,
          {
            headerName: "Actions",
            field: "actions",
            cellRenderer: ColumnAction,
            filter: false,
            sortable: false,
            width: 100,
            pinned: "right",
          },
        ]}
        pagination={true}
        paginationPageSize={50}
        onGridReady={() => setIsGridInitialized(true)}
      />
    </Box>
  );
};

export default BookListPresenter;
