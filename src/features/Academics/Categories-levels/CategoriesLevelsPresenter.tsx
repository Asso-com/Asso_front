import { useEffect, useRef, useState } from "react"
import { Box, SimpleGrid } from "@chakra-ui/react"
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid"
import StatsHorizontal from "@components/shared/StatsHorizontal"
import { FaBook, FaChalkboardTeacher } from "react-icons/fa"
import HeaderActions from "./components/HeaderActions"
import type { AgGridReact as AgGridReactType } from "ag-grid-react"
import LevelCategoriesColumnDefs from "./constants/LevelCategoriesColumnDefs"

interface SubjectPresenterProps {
  rows?: any[]
  total?: number
}

const CategoriesLevelsPresenter = ({
  rows = [],
  total = 0,
}: SubjectPresenterProps) => {
  const gridRef = useRef<AgGridReactType>(null)
  const [isGridInitialized, setIsGridInitialized] = useState(false)

  useEffect(() => {
    if (gridRef.current) {
      setIsGridInitialized(true)
    }
  }, [gridRef.current])

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={2}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 2 }} spacing={4}>
        <StatsHorizontal
          icon={FaBook}
          color="blue.500"
          stats={total.toString()}
          statTitle="Total Categories"
          borderLeft="4px solid"
          borderColor="blue.500"
        />
        <StatsHorizontal
          icon={FaChalkboardTeacher}
          color="purple.500"
          stats={"0".toString()}
          statTitle="Own Categories"
          borderLeft="4px solid"
          borderColor="purple.500"
        />
      </SimpleGrid>

      {isGridInitialized && <HeaderActions gridRef={gridRef} />}

      <Box flex={1} minH="0">
        <CustomAgGrid
          ref={gridRef}
          rowData={rows}
          colDefs={LevelCategoriesColumnDefs}
          onGridReady={() => setIsGridInitialized(true)}
          pagination={true}
          paginationPageSize={10}
          suppressCellFocus={true}
          animateRows={true}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 150,
          }}
        />
      </Box>
    </Box>
  )
}

export default CategoriesLevelsPresenter
