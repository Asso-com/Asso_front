import type { ColDef, ValueGetterParams } from "ag-grid-community";

// Type definitions for better type safety
interface SessionData {
  code: string;
  createdAt: string;
  staff: {
    firstName: string;
    lastName: string;
  };
  levelSubject: {
    level: string;
    subject: string;
  };
  periodicity: string;
  startDate: string;
  endDate: string;
  maxStudentsCapacity: number;
  placesAvailable: number;
  fees: number;
}

type SessionValueGetterParams = ValueGetterParams<SessionData>;

const SessionColumnDefs: ColDef<SessionData>[] = [
  {
    field: "code",
    headerName: "Session Code",
    width: 160,
    minWidth: 120,
    filter: "agTextColumnFilter",
    cellStyle: { textAlign: "left" },
    pinned: "left",
    sortable: true,
    resizable: true,
    suppressMovable: true,
    headerTooltip: "Unique session identifier",
  },
  {
    field: "createdAt",
    headerName: "Created",
    width: 180,
    minWidth: 140,
    filter: "agDateColumnFilter",
    cellStyle: { textAlign: "left" },
    pinned: "left",
    sortable: true,
    resizable: true,
    valueFormatter: (params) => {
      if (!params.value) return "";
      return new Date(params.value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    headerTooltip: "Date when session was created",
  },
  {
    colId: "staff",
    headerName: "Staff Member",
    valueGetter: (params: SessionValueGetterParams) => {
      const { staff } = params.data || {};
      return staff ? `${staff.firstName} ${staff.lastName}` : "";
    },
    width: 200,
    minWidth: 150,
    cellStyle: { textAlign: "left" },
    filter: "agTextColumnFilter",
    sortable: true,
    resizable: true,
    headerTooltip: "Assigned staff member",
  },
  {
    colId: "level",
    headerName: "Level",
    valueGetter: (params: SessionValueGetterParams) => {
      const { levelSubject } = params.data || {};
      return levelSubject?.level || "";
    },
    width: 120,
    minWidth: 80,
    cellStyle: { textAlign: "center" },
    filter: "agTextColumnFilter",
    sortable: true,
    resizable: true,
    headerTooltip: "Academic level",
  },
  {
    colId: "subject",
    headerName: "Subject",
    valueGetter: (params: SessionValueGetterParams) => {
      const { levelSubject } = params.data || {};
      return levelSubject?.subject || "";
    },
    width: 180,
    minWidth: 120,
    cellStyle: { textAlign: "left" },
    filter: "agTextColumnFilter",
    sortable: true,
    resizable: true,
    headerTooltip: "Subject being taught",
  },
  {
    field: "periodicity",
    headerName: "Frequency",
    width: 140,
    minWidth: 100,
    cellStyle: { textAlign: "center" },
    filter: "agTextColumnFilter",
    sortable: true,
    resizable: true,
    headerTooltip: "Session frequency/periodicity",
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 140,
    minWidth: 120,
    cellStyle: { textAlign: "center" },
    filter: "agDateColumnFilter",
    sortable: true,
    resizable: true,
    valueFormatter: (params) => {
      if (!params.value) return "";
      return new Date(params.value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
    headerTooltip: "Session start date",
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 140,
    minWidth: 120,
    cellStyle: { textAlign: "center" },
    filter: "agDateColumnFilter",
    sortable: true,
    resizable: true,
    valueFormatter: (params) => {
      if (!params.value) return "";
      return new Date(params.value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
    headerTooltip: "Session end date",
  },
  {
    field: "maxStudentsCapacity",
    headerName: "Max Capacity",
    width: 130,
    minWidth: 100,
    cellStyle: { textAlign: "right" },
    filter: "agNumberColumnFilter",
    sortable: true,
    resizable: true,
    valueFormatter: (params) => {
      return params.value?.toString() || "0";
    },
    headerTooltip: "Maximum student capacity",
  },
  {
    field: "placesAvailable",
    headerName: "Available",
    width: 120,
    minWidth: 90,
    cellStyle: (params) => {
      const available = params.value || 0;
      const capacity = params.data?.maxStudentsCapacity || 0;
      const percentage = capacity > 0 ? (available / capacity) * 100 : 0;
      
      let color = "#28a745"; // Green for high availability
      if (percentage < 20) color = "#dc3545"; // Red for low availability
      else if (percentage < 50) color = "#ffc107"; // Yellow for medium availability
      
      return {
        textAlign: "right",
        color: color,
        fontWeight: "bold",
      };
    },
    filter: "agNumberColumnFilter",
    sortable: true,
    resizable: true,
    valueFormatter: (params) => {
      return params.value?.toString() || "0";
    },
    headerTooltip: "Number of places still available",
  },
  {
    field: "fees",
    headerName: "Fees",
    width: 120,
    minWidth: 80,
    cellStyle: { textAlign: "right" },
    filter: "agNumberColumnFilter",
    sortable: true,
    resizable: true,
    valueFormatter: (params) => {
      if (!params.value && params.value !== 0) return "";
      return `$${params.value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    headerTooltip: "Session fees in USD",
  },
];

export default SessionColumnDefs;