import { useState, useEffect, useMemo, useCallback } from "react";
import type { DatePeriod } from "@features/sessions/Session-schedule/components/ui/DatePeriodNavigator";
import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";
import type { AcademicWeek } from "@features/system-settings/academic-period-weeks/types";
import { getCurrentAcademicWeek } from "@features/sessions/Session-schedule/utils/getCurrentAcademicWeek";
import useSessionDates from "@features/sessions/Session-schedule/hooks/useSessionDates";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

interface UseWeekSelectionProps {
  weeksData: AcademicWeek[];
  weeksOptions: DatePeriod[];
}

interface UseWeekSelectionReturn {
  selectedWeekId: number;
  defaultSelectedIndex: number;
  sessionsDates: SessionSchuduleDate[];
  handleWeekChange: (selectedWeek: DatePeriod) => void;
  isLoading: boolean;
  error: Error | null;
}

const useWeekSelection = ({
  weeksData,
  weeksOptions,
}: UseWeekSelectionProps): UseWeekSelectionReturn => {

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const [selectedWeekId, setSelectedWeekId] = useState<number>(0);

  // Initialize selected week with the current week or first available option
  useEffect(() => {
    if (weeksOptions.length > 0 && selectedWeekId === 0) {
      const week = getCurrentAcademicWeek(weeksData);
      if (!week) return;

      // Check if the current week exists in the options
      const weekExists = weeksOptions.some(option => option.value === week.id);
      if (weekExists) {
        setSelectedWeekId(week.id);
      } else {
        // If current week not found, use the first option
        setSelectedWeekId(weeksOptions[0].value);
      }
    }
  }, [weeksOptions, selectedWeekId, weeksData, associationId, getCurrentAcademicWeek]);

  // Calculate the default selected index for the DatePeriodNavigator
  const defaultSelectedIndex = useMemo(() => {
    if (weeksOptions.length === 0 || selectedWeekId === 0) return 0;

    const index = weeksOptions.findIndex(option => option.value === selectedWeekId);
    return index >= 0 ? index : 0;
  }, [weeksOptions, selectedWeekId]);

  // Fetch session dates data
  const { data: sessionsDates = [], isLoading, error } = useSessionDates(
    associationId,
    selectedWeekId
  );

  const handleWeekChange = useCallback((selectedWeek: DatePeriod) => {
    setSelectedWeekId(selectedWeek.value);
  }, []);

  return {
    selectedWeekId,
    defaultSelectedIndex,
    sessionsDates: sessionsDates || [],
    handleWeekChange,
    isLoading,
    error,
  };
};

export default useWeekSelection; 