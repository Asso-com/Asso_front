import {
  convertLocalToUTC,
  convertUTCToLocalDisplay,
  formatDateOnly,
} from "@utils/timeUtils";
import type { ColDef } from "ag-grid-community";

const formatLocalTime = (
  date: string,
  time: string,
  sourceTimezone: string = "Africa/Tunis"
): string => {
  const parisDateTimeISO = convertLocalToUTC(
    `${date}T${time}`,
    "iso",
    sourceTimezone
  );

  return convertUTCToLocalDisplay(parisDateTimeISO, {
    format: "medium",
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
    field: "date",
    valueFormatter: (params) => {
      if (!params.value) return "";
      return formatDateOnly(params.value, {
        format: "medium",
      });
    },
  },
  {
    headerName: "Start Time",
    valueGetter: ({ data }) =>
      formatLocalTime(data?.date, data?.startTime, data?.timeZone),
  },
  {
    headerName: "End Time",
    valueGetter: ({ data }) =>
      formatLocalTime(data?.date, data?.endTime, data?.timeZone),
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
