import { type ColDef } from "ag-grid-community";
import i18next from 'i18next';

const t = i18next.t.bind(i18next);


const StudentColumnDefs: ColDef[] = [
  {
    headerName: "Enrollment",
    field: "enrolledInCurrentPeriod",
    sortable: true,
    filter: true,
    width: 150,
    pinned: "left",
    cellStyle: {
      textAlign: "center",
      padding: "8px 4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    cellRenderer: (params: any) => {
      const isEnrolled = params.value;
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "13px",
            fontWeight: "500",
            color: isEnrolled ? "#059669" : "#dc2626",
            padding: "2px 6px",
            borderRadius: "4px",
            backgroundColor: isEnrolled ? "#ecfdf5" : "#fef2f2",
            border: `1px solid ${isEnrolled ? "#a7f3d0" : "#fecaca"}`,
            height: "20px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: isEnrolled ? "#059669" : "#dc2626",
            }}
          />
          {isEnrolled ? t("Enrolled") : t("Not Enrolled")}
        </div>
      );
    },
  },
  {
    headerName: "Registration ID",
    field: "registrationId",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "First name",
    field: "firstName",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Last name",
    field: "lastName",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Date of birth",
    field: "dateOfBirth",
    sortable: true,
    filter: "agDateColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    cellStyle: { textAlign: "left" },
    valueFormatter: (params) =>
      params.value ? new Date(params.value).toLocaleDateString() : "",
  },
  {
    headerName: "Email",
    field: "email",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Phone",
    field: "mobileNumber",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "School",
    field: "establishment",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Admission Date",
    field: "admissionDate",
    sortable: true,
    filter: "agDateColumnFilter",
    resizable: true,
    minWidth: 150,
    flex: 1,
    cellStyle: { textAlign: "left" },
    valueFormatter: (params) =>
      params.value ? new Date(params.value).toLocaleDateString() : "",
  },
  {
    headerName: "Gender",
    field: "gender",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 120,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "City",
    field: "city",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 120,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
];

export default StudentColumnDefs;