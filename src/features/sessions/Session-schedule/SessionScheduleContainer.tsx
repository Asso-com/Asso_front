import { useState, useMemo, useCallback } from "react";
import {
  Box,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  Center,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import StatsHeader from "./components/ui/StatsHeader";
import CancelFilter from "./components/ui/CancelFilter";
import ModernSessionCard from "./components/ui/ModernSessionCard";
import DayPresentation from "./components/ui/DayPresentation";
import FilterPanel from "./components/filters/FilterPanel";
import { useSessionFilters } from "./hooks/useSessionFilters";
import type { SessionSchuduleDate } from "./types";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import useFetchAcademicPeriodWeeks from "@features/system-settings/academic-period-weeks/hooks/useFetchAcademicPeriodWeeks";
import useWeeksOptions from "./hooks/useWeeksOptions";
import useWeekSelection from "./hooks/useWeekSelection";
import { dayNames, groupSessionsByDay } from "./utils/sessionUtils";

const SessionScheduleContainer = () => {
  const [viewMode, setViewMode] = useState<"grouped" | "cards">("cards");

  const bgColor = useColorModeValue("gray.50", "gray.900");

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  // Fetch academic weeks
  const { data: weeksData, isLoading: weeksLoading } =
    useFetchAcademicPeriodWeeks(associationId);

  const weeksOptions = useWeeksOptions(weeksData);

  // Use custom hook for week selection logic
  const {
    selectedWeekId,
    defaultSelectedIndex,
    sessionsDates: sessions,
    handleWeekChange,
    isLoading: sessionsLoading,
    error: sessionsError,
  } = useWeekSelection({
    weeksData,
    weeksOptions,
  });

  const handleViewModeChange = useCallback((mode: "grouped" | "cards") => {
    setViewMode(mode);
  }, []);

  // Session filters hook
  const {
    selectedDay,
    selectedLevel,
    selectedSubject,
    selectedStatus,
    selectedStaff,
    setSelectedDay,
    setSelectedLevel,
    setSelectedSubject,
    setSelectedStatus,
    setSelectedStaff,
    filteredSessions,
    filterOptions,
    hasActiveFilters,
    clearFilters,
    subjectColors,
  } = useSessionFilters(sessions);

  const sessionsByDay = useMemo(() => {
    return groupSessionsByDay(filteredSessions);
  }, [filteredSessions]);

  if (weeksLoading) {
    return (
      <Box
        bg={bgColor}
        minH="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        overflow="hidden"
        gap={2}
        p={4}
      >
        <Center flex={1}>
          <Spinner size="xl" />
        </Center>
      </Box>
    );
  }

  // No weeks available
  if (weeksOptions.length === 0) {
    return (
      <Box
        bg={bgColor}
        minH="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        overflow="hidden"
        gap={2}
        p={4}
      >
        <Alert status="info">
          <AlertIcon />
          No academic weeks available.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      bg={bgColor}
      minH="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      gap={2}
    >
      <FilterPanel
        selectedWeekId={selectedWeekId}
        handleWeekChange={handleWeekChange}
        weeksOptions={weeksOptions}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedStaff={selectedStaff}
        setSelectedStaff={setSelectedStaff}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        filterOptions={filterOptions}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
        viewMode={viewMode}
        setViewMode={handleViewModeChange}
        dayNames={dayNames}
        defaultSelectedIndex={defaultSelectedIndex}
      />

      <Box flex={1} overflow="auto" p={2}>
        {sessionsLoading ? (
          <Center p={8}>
            <Spinner size="lg" />
          </Center>
        ) : sessionsError ? (
          <Alert status="error">
            <AlertIcon />
            Error loading sessions
          </Alert>
        ) : (
          <>
            <StatsHeader filteredSessions={filteredSessions} />

            {viewMode === "grouped" ? (
              <DayPresentation
                sessionsByDay={sessionsByDay}
                subjectColors={subjectColors}
              />
            ) : filteredSessions.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={6}>
                {filteredSessions.map((session: SessionSchuduleDate) => (
                  <ModernSessionCard
                    key={session.sessionDateId}
                    session={session}
                    subjectColors={subjectColors}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <CancelFilter clearFilters={clearFilters} />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SessionScheduleContainer;
