import { useMemo, useCallback, useState } from "react";
import {
  Box,
  VStack,
  useColorModeValue,
  Divider,
  Flex,
  Button,
  Icon,
  Spinner,
  Text,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiDownload, FiFileText } from "react-icons/fi";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import type { Attendance } from "../../types";
import useFetchAttandance from "../../hooks/useFetchAttandance";
import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";
import AttandanceColDefs from "../../constants/AttandanceColDefs";
import SessionInfoCard from "./SessionInfoCard";
import SessionStatusCard from "./SessionStatusCard";
import AttendanceStatsCard from "./AttendanceStatsCard";
import { generatePdf } from "./utility/pdfGenerator";
import useRegisterAttendance from "../../hooks/useRegisterAttendance";
import useValidateSession from "../../hooks/useValidateSession";
import useCancelSession from "../../hooks/useCancelSession";
import SessionRemarks from "./SessionRemarks";

interface AttendanceCellProps {
  attandanceDate: SessionSchuduleDate;
}

const AttendanceSessionDate: React.FC<AttendanceCellProps> = ({
  attandanceDate,
}) => {
  const registerAttendance = useRegisterAttendance();
  const validateSession = useValidateSession();
  const cancelSession = useCancelSession();

  const [sessionData, setSessionData] = useState(attandanceDate);
  const [isExporting, setIsExporting] = useState(false);

  const { data: response } = useFetchAttandance(sessionData.sessionDateId);
  const attendance: Attendance[] = response?.attendances || [];

  const cardBg = useColorModeValue("white", "gray.800");
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleRegisterAttendance = useCallback(async () => {
    try {
      await registerAttendance.mutateAsync({
        sessionDateId: sessionData.sessionDateId,
      });
      setSessionData((prev) => ({ ...prev, attendanceMarked: true }));
    } catch {}
  }, [sessionData.sessionDateId, registerAttendance]);

  const handleValidateSession = useCallback(async () => {
    try {
      await validateSession.mutateAsync({
        sessionDateId: sessionData.sessionDateId,
      });
      setSessionData((prev) => ({ ...prev, validated: true }));
    } catch {}
  }, [sessionData.sessionDateId, validateSession]);

  const handleCancelSession = useCallback(async () => {
    try {
      await cancelSession.mutateAsync({
        sessionDateId: sessionData.sessionDateId,
      });
      setSessionData((prev) => ({ ...prev, canceled: true }));
    } catch {}
  }, [sessionData.sessionDateId, cancelSession]);

  const stats = useMemo(() => {
    const total = attendance.length;
    const present = attendance.filter(
      (a) => a.attendanceType === "PRESENT"
    ).length;
    const absent = attendance.filter(
      (a) => a.attendanceType === "ABSENT"
    ).length;
    const late = attendance.filter((a) => a.attendanceType === "LATE").length;
    const presentRate = total > 0 ? Math.round((present / total) * 100) : 0;
    return { total, present, absent, late, presentRate };
  }, [attendance]);

  const handleExportPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      await generatePdf({
        sessionData,
        attendance,
        stats,
        teacherSummary: sessionData.teacherSummary || "",
        administrationSummary: sessionData.administrationSummary || "",
      });
    } finally {
      setIsExporting(false);
    }
  }, [sessionData, attendance, stats]);

  return (
    <Box h="85vh" p={{ base: 2, md: 4 }} maxW="100%">
      <VStack spacing={4} align="stretch" h="100%">
        <Flex direction={{ base: "column", md: "row" }} gap={4}>
          <SessionInfoCard sessionData={sessionData} cardBg={cardBg} />
          <SessionStatusCard
            sessionData={sessionData}
            cardBg={cardBg}
            onToggleAttendanceMarked={handleRegisterAttendance}
            onToggleValidated={handleValidateSession}
            onToggleCanceled={handleCancelSession}
          />
          <AttendanceStatsCard stats={stats} cardBg={cardBg} />
          <SessionRemarks sessionData={sessionData} cardBg={cardBg} />
        </Flex>

        <Divider />

        <Flex justify="flex-end" align="center" w="100%">
          <Button
            leftIcon={
              isExporting ? <Spinner size="sm" /> : <Icon as={FiDownload} />
            }
            colorScheme="blue"
            variant="solid"
            onClick={handleExportPDF}
            isLoading={isExporting}
            loadingText="Export..."
            isDisabled={attendance.length === 0}
          >
            {!isMobile && (
              <HStack spacing={2}>
                <Text>Fiche PDF</Text>
              </HStack>
            )}
            {isMobile && <Icon as={FiFileText} />}
          </Button>
        </Flex>

        <Box flex={1} w="100%">
          <CustomAgGrid
            rowData={attendance}
            colDefs={AttandanceColDefs}
            pagination={true}
            paginationPageSize={isMobile ? 5 : 10}
            suppressHorizontalScroll={false}
            enableCellTextSelection={true}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default AttendanceSessionDate;
