import { useMemo, useCallback, useState } from "react";
import {
  Box,
  VStack,
  useColorModeValue,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import type { Attendance } from "../../types";
import useFetchAttandance from "../../hooks/useFetchAttandance";
import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";
import AttandanceColDefs from "../../constants/AttandanceColDefs";
import SessionInfoCard from "./SessionInfoCard";
import SessionStatusCard from "./SessionStatusCard";
import AttendanceStatsCard from "./AttendanceStatsCard";
import RemarksCard from "./RemarksCard";

interface AttendanceCellProps {
  attandanceDate: SessionSchuduleDate;
}

const AttendanceSessionDate: React.FC<AttendanceCellProps> = ({
  attandanceDate,
}) => {
  const [sessionData, setSessionData] = useState(attandanceDate);

  const { data: response } = useFetchAttandance(sessionData.sessionDateId);
  const attendance: Attendance[] = response?.attendances || [];

  const cardBg = useColorModeValue("white", "gray.800");

  const toggleAttendanceMarked = useCallback(() => {
    setSessionData((prev) => ({
      ...prev,
      attendanceMarked: !prev.attendanceMarked,
    }));
  }, []);

  const toggleValidated = useCallback(() => {
    setSessionData((prev) => ({
      ...prev,
      validated: !prev.validated,
    }));
  }, []);

  const toggleCanceled = useCallback(() => {
    setSessionData((prev) => ({
      ...prev,
      canceled: !prev.canceled,
    }));
  }, []);

  const stats = useMemo(() => {
    const total = attendance.length;
    const present = attendance.filter(
      (a) => a.attendanceType === "PRESENT"
    ).length;
    const absent = attendance.filter(
      (a) => a.attendanceType === "ABSENT"
    ).length;
    const late = attendance.filter((a) => a.attendanceType === "LATE").length;
    return { total, present, absent, late };
  }, [attendance]);

  return (
    <Box h="90vh" p={2}>
      <VStack spacing={4} align="stretch" h="100%">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          <SessionInfoCard sessionData={sessionData} cardBg={cardBg} />
          <SessionStatusCard
            sessionData={sessionData}
            cardBg={cardBg}
            onToggleAttendanceMarked={toggleAttendanceMarked}
            onToggleValidated={toggleValidated}
            onToggleCanceled={toggleCanceled}
          />
          <AttendanceStatsCard stats={stats} cardBg={cardBg} />
          <RemarksCard cardBg={cardBg} />
        </SimpleGrid>

        <Divider />

        <Box flex={1}>
          <CustomAgGrid
            rowData={attendance}
            colDefs={AttandanceColDefs}
            pagination={true}
            paginationPageSize={10}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default AttendanceSessionDate;
