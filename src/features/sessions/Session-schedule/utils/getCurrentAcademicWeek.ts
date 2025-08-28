import type { AcademicWeek } from "@features/system-settings/academic-period-weeks/types";

const formatDateToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
type PeriodResult = {
    id: number;
    week: AcademicWeek;
};
export const getCurrentAcademicWeek = (
    weeksData: AcademicWeek[]
): PeriodResult | null => {
    if (!weeksData || weeksData.length === 0) return null;

    const todayFormatted = formatDateToDDMMYYYY(new Date());

    const currentPeriod = weeksData.find((week) => {
        const startFormatted = formatDateToDDMMYYYY(new Date(week.startDate));
        const endFormatted = formatDateToDDMMYYYY(new Date(week.endDate));

        return todayFormatted >= startFormatted && todayFormatted <= endFormatted;
    });

    const fallbackWeek = currentPeriod ?? weeksData[0];

    return {
        id: fallbackWeek.id,
        week: fallbackWeek,
    };
};