import { Box, SimpleGrid } from "@chakra-ui/react";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import React, { useCallback, useRef, useState, useMemo } from "react";
import { FaBook, FaCheckCircle, FaClipboardCheck } from "react-icons/fa";
import HeaderActions from "./components/HeaderActions";
import SessionDateColdef from "./constants/SessionDateColdef";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import type { AgGridReact } from "ag-grid-react";
import type { SessionSchuduleDate } from "../Session-schedule/types";
import ColumnAction from "./components/ColumnAction";
import useWeeksOptions from "../Session-schedule/hooks/useWeeksOptions";
import useWeekSelection from "../Session-schedule/hooks/useWeekSelection";
import type { AcademicWeek } from "@features/system-settings/academic-period-weeks/types";

interface SessionConsultationPresenterProps {
  weeksData: AcademicWeek[];
}

const SessionConsultationPresenter: React.FC<
  SessionConsultationPresenterProps
> = ({ weeksData }) => {
  const gridRef = useRef<AgGridReact>(null);
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  const weeksOptions = useWeeksOptions(weeksData);

  // Use custom hook for week selection logic
  const { defaultSelectedIndex, sessionsDates, handleWeekChange } =
    useWeekSelection({
      weeksData,
      weeksOptions,
    });

  const statistics = useMemo(() => {
    const totalSessions = sessionsDates.length;
    const validatedSessions = sessionsDates.filter(
      (session: SessionSchuduleDate) => session.validated
    ).length;
    const attendanceMarkedSessions = sessionsDates.filter(
      (session: SessionSchuduleDate) => session.attendanceMarked
    ).length;

    return {
      total: totalSessions,
      validated: validatedSessions,
      attendanceMarked: attendanceMarkedSessions,
    };
  }, [sessionsDates]);

  const handleGridReady = useCallback(() => {
    setIsGridInitialized(true);
  }, []);

  const columnDefs = useMemo(
    () => [
      ...SessionDateColdef,
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
    <Box height="100%" display="flex" flexDirection="column" gap={4} p={2}>
      <SimpleGrid columns={{ base: 1, sm: 1, md: 3 }} spacing={3}>
        <StatsHorizontal
          icon={FaBook}
          color="blue.500"
          stats={statistics.total.toString()}
          statTitle="Total Session Dates"
          borderLeft="6px solid"
          borderColor="blue.500"
        />
        <StatsHorizontal
          icon={FaCheckCircle}
          color="green.500"
          stats={statistics.validated.toString()}
          statTitle="Validated Sessions"
          borderLeft="6px solid"
          borderColor="green.500"
        />
        <StatsHorizontal
          icon={FaClipboardCheck}
          color="orange.500"
          stats={statistics.attendanceMarked.toString()}
          statTitle="Attendance Marked"
          borderLeft="6px solid"
          borderColor="orange.500"
        />
      </SimpleGrid>

      {isGridInitialized && (
        <HeaderActions
          gridRef={gridRef}
          weeksOptions={weeksOptions}
          handleWeekChange={handleWeekChange}
          defaultSelectedIndex={defaultSelectedIndex}
        />
      )}

      <CustomAgGrid
        ref={gridRef}
        rowData={sessionsDates}
        colDefs={columnDefs}
        pagination={true}
        paginationPageSize={50}
        onGridReady={handleGridReady}
      />
    </Box>
  );
};

export default SessionConsultationPresenter;
