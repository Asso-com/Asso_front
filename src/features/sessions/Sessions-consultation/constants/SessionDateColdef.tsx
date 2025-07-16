import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";
import {
  convertUTCToLocalDisplay,
  formatDateOnly,
  localToReadableTime,
} from "@utils/timeUtils";
import type { ColDef } from "ag-grid-community";

const SessionDateColdef: ColDef<SessionSchuduleDate>[] = [
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
    field: "sessionDate",
    valueFormatter: ({ value }) =>
      value ? formatDateOnly(value, { format: "medium" }) : "",
  },
  {
    headerName: "Start Time",
    field: "startTime",
    valueGetter: ({ data }) =>
      data?.sessionDate && data?.startTime
        ? localToReadableTime(data.sessionDate, data.startTime, data.timeZone)
        : "",
  },
  {
    headerName: "End Time",
    field: "endTime",
    valueGetter: ({ data }) =>
      data?.sessionDate && data?.endTime
        ? localToReadableTime(data.sessionDate, data.endTime, data.timeZone)
        : "",
  },
  {
    headerName: "Registration Date",
    field: "attendanceRegistrationDateTime",
    valueFormatter: (params) => {
      if (!params.value) return "";
      return convertUTCToLocalDisplay(params.value, {
        format: "medium",
      });
    },
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
    valueGetter: ({ data }) =>
      `${data?.firstName || ""} ${data?.lastName || ""}`.trim(),
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
  {
    field: "quizNumber",
    headerName: "Quiz Number",
    type: "numericColumn",
    cellStyle: { textAlign: "center" },
  },
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
