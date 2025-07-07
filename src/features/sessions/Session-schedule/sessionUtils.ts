import type { SessionSchuduleDate } from "./types";

export const dayNames: Record<string, string> = {
    MONDAY: "Monday",
    TUESDAY: "Tuesday",
    WEDNESDAY: "Wednesday",
    THURSDAY: "Thursday",
    FRIDAY: "Friday",
    SATURDAY: "Saturday",
    SUNDAY: "Sunday",
};

export const daysOfWeek: (keyof typeof dayNames)[] = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
];

export const groupSessionsByDay = (
    sessions: SessionSchuduleDate[]
): Record<keyof typeof dayNames, SessionSchuduleDate[]> => {
    const grouped: Record<keyof typeof dayNames, SessionSchuduleDate[]> = {
        MONDAY: [],
        TUESDAY: [],
        WEDNESDAY: [],
        THURSDAY: [],
        FRIDAY: [],
        SATURDAY: [],
        SUNDAY: [],
    };

    daysOfWeek.forEach((day) => {
        grouped[day] = sessions.filter((session) => session.day === day);
    });

    return grouped;
};
