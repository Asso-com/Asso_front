import type { ColDef } from "ag-grid-community";

const SessionColumnDefs: ColDef[] = [
  { field: "code", headerName: "Code", flex: 1 },
  {
    headerName: "Staff",
    valueGetter: (params: any) =>
      `${params.data.staff.firstName} ${params.data.staff.lastName}`,
    flex: 1.3,
  },
  {
    headerName: "Level",
    valueGetter: (params: any) => `(${params.data.levelSubject.level})`,
    flex: 1.2,
  },
  {
    headerName: "Subject",
    valueGetter: (params: any) => `${params.data.levelSubject.subject}`,
    flex: 1.3,
  },
  { field: "periodicity", headerName: "Periodicity", flex: 1 },
  { field: "startDate", headerName: "Start Date", flex: 1.3 },
  { field: "endDate", headerName: "End Date", flex: 1.3 },
  { field: "maxStudentsCapacity", headerName: "Max Capacity", flex: 0.8 },
  { field: "placesAvailable", headerName: "Places Left", flex: 0.8 },
  { field: "fees", headerName: "Fees ($)", flex: 0.8},
];

export default SessionColumnDefs;
