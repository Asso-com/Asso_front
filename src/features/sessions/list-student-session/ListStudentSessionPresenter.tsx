import { useMemo, useRef } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdBlock } from "react-icons/md";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";

import StatsHorizontal from "@components/shared/StatsHorizontal";
import HeaderActions from "./components/HeaderActions";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import type { Session, SessionStudentEnrollmentResponse } from "./types/sessions.types";
import SessionColDefs from "./constants/SessionColDefs";

interface Props {
  apiData?: SessionStudentEnrollmentResponse[];
  isLoading: boolean;
  error: any;
}

const transformApiDataToSession = (apiData: SessionStudentEnrollmentResponse[]): Session[] =>
  apiData.map(item => ({
    id: item.id,
    title: `${item.levelSubject.level} - ${item.levelSubject.subject}`,
    startdate: item.startDate,
    enddate: item.endDate,
    teacher: `${item.staff.firstName} ${item.staff.lastName}`,
    Frequency: item.periodicity,
    status:
      new Date(item.endDate) < new Date()
        ? "completed"
        : new Date(item.startDate) > new Date()
        ? "upcoming"
        : "active",
    students: item.students.map(student => ({
      id: parseInt(student.studentId) || Math.random(),
      name: student.fullName,
      avatar: undefined,
    })),
  }));

const ListStudentSessionPresenter = ({
  apiData,
  isLoading,
  error,
}: Props) => {
  const gridRef = useRef<AgGridReactType>(null);

  const sessions = useMemo(() => (apiData ? transformApiDataToSession(apiData) : []), [apiData]);

  const stats = useMemo(() => {
    const counts = { total: 0, active: 0, completed: 0, upcoming: 0 };
    sessions.forEach(({ status }) => {
      counts.total += 1;
      counts[status as keyof typeof counts]++;
    });
    return counts;
  }, [sessions]);

  if (isLoading) {
    return (
      <Box height="100%" display="flex" alignItems="center" justifyContent="center">
        <div>Loading sessions...</div>
      </Box>
    );
  }

  if (error) {
    return (
      <Box height="100%" display="flex" alignItems="center" justifyContent="center">
        <div>Error loading sessions: {error.message}</div>
      </Box>
    );
  }

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2} p={1}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
        <StatsHorizontal
          icon={HiOutlineOfficeBuilding}
          color="blue.500"
          stats={stats.total.toString()}
          statTitle="Total Sessions"
          borderLeft="6px solid"
          borderColor="blue.500"
        />
        <StatsHorizontal
          icon={MdBlock}
          color="orange.500"
          stats={stats.upcoming.toString()}
          statTitle="Upcoming Sessions"
          borderLeft="6px solid"
          borderColor="orange.500"
        />
      </SimpleGrid>

      <Box flexShrink={0} py={1} px={1} boxShadow="sm">
        <HeaderActions
          gridRef={gridRef}
        />
      </Box>

      <CustomAgGrid
        ref={gridRef}
        rowData={sessions}
        colDefs={SessionColDefs}
        pagination={true}
        paginationPageSize={5}
        rowHeight={50}
      />
    </Box>
  );
};

export default ListStudentSessionPresenter;
