import { useState, useMemo } from "react";
import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import sessionsData from "./data";
import StatsHeader from "./components/ui/StatsHeader";
import CancelFilter from "./components/ui/CancelFilter";
import ModernSessionCard from "./components/ui/ModernSessionCard";
import DayPresentation from "./components/ui/DayPresentation";
import FilterPanel from "./components/filters/FilterPanel";
import { useSessionFilters } from "./hooks/useSessionFilters";
import { dayNames, groupSessionsByDay } from "./sessionUtils";
import type { SessionTracking } from "./types";

const SessionScheduleContainer = () => {
  const [viewMode, setViewMode] = useState<"grouped" | "cards">("grouped");
  const bgColor = useColorModeValue("gray.50", "gray.900");

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
  } = useSessionFilters(sessionsData);

  const sessionsByDay = useMemo(() => {
    return groupSessionsByDay(filteredSessions);
  }, [filteredSessions]);

  return (
    <Box
      bg={bgColor}
      minH={"100%"}
      height={"100%"}
      display="flex"
      flexDirection="column"
      overflow="hidden"
      gap={2}
      p={4}
    >
      <FilterPanel
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
        setViewMode={setViewMode}
        dayNames={dayNames}
      />

      <Box flex={1} overflow="auto">
        <StatsHeader filteredSessions={filteredSessions} />

        {viewMode === "grouped" ? (
          <DayPresentation sessionsByDay={sessionsByDay} />
        ) : filteredSessions.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={6}>
            {filteredSessions.map((session: SessionTracking) => (
              <ModernSessionCard
                key={session.sessionDateId}
                session={session}
              />
            ))}
          </SimpleGrid>
        ) : (
          <CancelFilter clearFilters={clearFilters} />
        )}
      </Box>
    </Box>
  );
};

export default SessionScheduleContainer;
