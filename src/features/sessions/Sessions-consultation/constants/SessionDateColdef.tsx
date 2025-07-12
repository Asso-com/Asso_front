import type { ColDef } from "ag-grid-community";

const formatLocalDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const formatLocalTime = (
  date: string,
  time: string,
  locale: string = "fr-FR"
): string => {
  if (!date || !time) return "";
  const utcString = `${date}T${time}:00Z`;
  const localDate = new Date(utcString);

  return localDate.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const SessionDateColdef: ColDef[] = [
  {
    field: "sessionCode",
    headerName: "Session Code",
    width: 350,
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "left" },
    pinned: "left",
  },
  { field: "sessionType", headerName: "Session Type" },
  {
    headerName: "Date",
    valueGetter: ({ data }) => formatLocalDate(data?.date),
  },
  {
    headerName: "Start Time",
    valueGetter: ({ data }) => formatLocalTime(data?.date, data?.startTime),
  },
  {
    headerName: "End Time",
    valueGetter: ({ data }) => formatLocalTime(data?.date, data?.endTime),
  },

  { field: "day", headerName: "Day" },

  {
    field: "classRoom",
    headerName: "Classroom",
    valueFormatter: ({ value }) => (value?.trim() ? value : "Online"),
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Full Name",
    valueGetter: ({ data }) => {
      const firstName = data?.firstName || "";
      const lastName = data?.lastName || "";
      return `${firstName} ${lastName}`.trim();
    },
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "left" },
  },
  {
    field: "level",
    headerName: "Level",
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "left" },
  },
  {
    field: "subject",
    headerName: "Subject",
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "left" },
  },
  { field: "quizNumber", headerName: "Quiz Number", type: "numericColumn" },

  {
    field: "attendanceMarked",
    headerName: "Attendance Marked",
    cellStyle: { textAlign: "center" },
  },
  {
    field: "validated",
    headerName: "Validated",
    cellStyle: { textAlign: "center" },
  },
  {
    field: "canceled",
    headerName: "Canceled",
    cellStyle: { textAlign: "center" },
  },
];

export default SessionDateColdef;
