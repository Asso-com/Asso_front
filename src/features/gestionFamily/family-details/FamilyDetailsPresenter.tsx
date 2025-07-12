import React, { useMemo, useRef, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";

import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import ColumnAction from "./components/column-actions/ColumnAction";
import HeaderActionsFamily from "./components/sidebar/HeaderActionsFamily";

import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import FamilyColumnDefs from "./constants/FamilyColumnDefs";

interface FamilyDetailsPresenterProps {
  rows: any[];
  total: number;
  blacklistedCount: number;
  missingParentCount: number;
}

const FamilyDetailsPresenter: React.FC<FamilyDetailsPresenterProps> = ({
  rows = [],
  total = 0,
  blacklistedCount,
  missingParentCount,
}) => {
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  const colDefs = useMemo(
    () => [
      ...FamilyColumnDefs,
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: ColumnAction,
        filter: false,
        sortable: false,
        width: 150,
        pinned: "right",
      },
    ],
    []
  );

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        <StatsHorizontal
          icon={FaUsers}
          color="gray.600"
          stats={total.toString()}
          statTitle="Total Families"
          borderLeft="6px solid"
          borderColor="gray.600"
        />

        <StatsHorizontal
          icon={FaUsers}
          color="red.500"
          stats={blacklistedCount.toString()}
          statTitle="Blacklisted"
          borderLeft="6px solid"
          borderColor="red.500"
        />

        <StatsHorizontal
          icon={FaUsers}
          color="orange.400"
          stats={missingParentCount.toString()}
          statTitle="Missing a Parent"
          borderLeft="6px solid"
          borderColor="orange.400"
        />
      </SimpleGrid>

      {isGridInitialized && <HeaderActionsFamily gridRef={gridRef} />}

      <CustomAgGrid
        ref={gridRef}
        rowData={rows}
        colDefs={colDefs}
        pagination
        paginationPageSize={50}
        onGridReady={() => setIsGridInitialized(true)}
      />
    </Box>
  );
};

export default FamilyDetailsPresenter;
