import type { AcademicWeek } from "@features/system-settings/academic-period-weeks/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useMemo } from "react";

const useWeeksOptions = (data: AcademicWeek[] | undefined) => {
  return useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.map((week: AcademicWeek) => ({
      value: week.id,
      label: `${format(new Date(week.startDate), "dd MMMM yyyy", {
        locale: fr,
      })} - ${format(new Date(week.endDate), "dd MMMM yyyy", { locale: fr })}`,
    }));
  }, [data]);
};
export default useWeeksOptions;
