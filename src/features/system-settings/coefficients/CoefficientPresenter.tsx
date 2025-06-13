import React, { useEffect, useRef, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import getCoefficientColumnDefs from "./components/constants/Coldefs";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import { FaPercent, FaClock } from "react-icons/fa";
import HeaderActions from "./components/HeaderActions";
import ColumnAction from "./components/column-actions/ColumnAction";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";

interface CoefficientPresenterProps {
  rows: any[];
  
}

const CoefficientPresenter: React.FC<CoefficientPresenterProps> = ({ rows = [] }) => {
  const gridRef = useRef<AgGridReactType>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);
  
  const columnDefs = getCoefficientColumnDefs();

  useEffect(() => {
    // Simplification de la logique d'initialisation du grid
    const checkGridInitialization = () => {
      if (gridRef.current) {
        setIsGridInitialized(true);
      }
    };
    
    checkGridInitialization();
  }, []); // Dépendance vide pour n'exécuter qu'une fois

  // Calculs des moyennes pour les statistiques
  const avgAssiduity = rows.length > 0 
    ? rows.reduce((sum: number, row: any) => {
        const value = row?.assiduity_coefficient ? parseFloat(row.assiduity_coefficient) : 0;
        return sum + (isNaN(value) ? 0 : value);
      }, 0) / rows.length
    : 0;
  
  const avgDelay = rows.length > 0 
    ? rows.reduce((sum: number, row: any) => {
        const value = row?.delay_before_attendance ? parseFloat(row.delay_before_attendance) : 0;
        return sum + (isNaN(value) ? 0 : value);
      }, 0) / rows.length
    : 0;

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={6}>
        <StatsHorizontal
          icon={FaPercent}
          color="purple.500"
          stats={avgAssiduity.toFixed(2)}
          statTitle="Avg Assiduity Coefficient"
          borderLeft="6px solid"
          borderColor={"purple.500"}
        />
        <StatsHorizontal
          icon={FaClock}
          color="green.500"
          stats={avgDelay.toFixed(2)}
          statTitle="Avg Delay Before Attendance"
          borderLeft="6px solid"
          borderColor={"green.500"}
        />
      </SimpleGrid>
      
      {/* HeaderActions conditionnel, comme dans SchoolYearPresenter */}
      {isGridInitialized && <HeaderActions gridRef={gridRef} />}
      
      <CustomAgGrid
        ref={gridRef}
        rowData={rows}
        colDefs={[
          ...columnDefs,
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
        // Identifiants de ligne uniques pour éviter les erreurs de duplication
    getRowId={(params) => {
  return params.data?.id ? 
    `coefficient-${params.data.id}` : 
    `new-row-${Math.random().toString(36).substring(2, 9)}`;
}}
      />
    </Box>
  );
};

export default CoefficientPresenter;