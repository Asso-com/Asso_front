import { useMemo, useCallback, useState } from "react";
import {
  Box,
  VStack,
  useColorModeValue,
  Divider,
  Flex,
  Button,
  Icon,
  useToast,
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
import RemarksCard from "./RemarksCard";
import { generatePdf } from "./utility/pdfGenerator";
interface AttendanceCellProps {
  attandanceDate: SessionSchuduleDate;
}

const AttendanceSessionDate: React.FC<AttendanceCellProps> = ({
  attandanceDate,
}) => {
  const [sessionData, setSessionData] = useState(attandanceDate);
  const [isExporting, setIsExporting] = useState(false);

  const { data: response } = useFetchAttandance(sessionData.sessionDateId);
  const attendance: Attendance[] = response?.attendances || [];

  const cardBg = useColorModeValue("white", "gray.800");
  const toast = useToast();

  const isMobile = useBreakpointValue({ base: true, md: false });

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
      });
    } finally {
      setIsExporting(false);
    }
  }, [sessionData, attendance, stats, toast]);

  return (
    <Box h="85vh" p={{ base: 2, md: 4 }} maxW="100%">
      <VStack spacing={4} align="stretch" h="100%">
        <Flex direction={{ base: "column", md: "row" }} gap={4}>
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
