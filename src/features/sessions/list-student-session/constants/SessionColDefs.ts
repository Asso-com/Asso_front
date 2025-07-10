import type { ColDef } from "ag-grid-community";
import React from "react";
import { TitleCell, DateCell, TeacherCell, FrequencyCell, StudentsCell } from "../components/SessionCells";

const SessionColDefs: ColDef[] = [
  {
    headerName: "Title",
    field: "title",
    flex: 0.5,
    minWidth: 150,
    autoHeight: true,
    cellRenderer: (params: any) => React.createElement(TitleCell, { data: params.data }),
    cellStyle: { display: "flex", alignItems: "center", justifyContent: "left" },
  },
  {
    headerName: "Dates",
    field: "startdate",
    flex: 0.5,
    minWidth: 150,
    autoHeight: true,
    cellRenderer: (params: any) => React.createElement(DateCell, { data: params.data }),
    cellStyle: { display: "flex", alignItems: "center", justifyContent: "left" },
  },
  {
    headerName: "Teacher",
    field: "teacher",
    flex: 0.5,
    minWidth: 120,
    autoHeight: true,
    cellRenderer: (params: any) => React.createElement(TeacherCell, { data: params.data }),
    cellStyle: { display: "flex", alignItems: "center", justifyContent: "left" },
  },
  {
    headerName: "Frequency",
    field: "Frequency",
    flex: 0.3,
    minWidth: 100,
    autoHeight: true,
    cellRenderer: (params: any) => React.createElement(FrequencyCell, { data: params.data }),
    cellStyle: { display: "flex", alignItems: "center", justifyContent: "left" },
  },
  {
    headerName: "Students",
    field: "students",
    flex: 1.5,
    minWidth: 300,
    autoHeight: true,
    cellRenderer: (params: any) =>
      React.createElement(StudentsCell, { students: params.data.students }),
    headerClass: "ag-header-center",
  },
];

export default SessionColDefs;
