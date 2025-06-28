import type { SessionTracking } from "./types";

export const dayNames: Record<string, string> = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
};

export const subjectColors: Record<string, string> = {
    Mathematics: "blue",
    Physics: "purple",
    French: "green",
    English: "orange",
    Spanish: "red",
    History: "teal",
    Biology: "cyan",
};


export const daysOfWeek: (keyof typeof dayNames)[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export const groupSessionsByDay = (
    sessions: SessionTracking[]
): Record<keyof typeof dayNames, SessionTracking[]> => {
    const grouped: Record<keyof typeof dayNames, SessionTracking[]> = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    };

    daysOfWeek.forEach((day) => {
        grouped[day] = sessions.filter((session) => session.day === day);
    });

    return grouped;
};
