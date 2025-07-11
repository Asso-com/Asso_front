import StandardColumnCellRender from "@components/shared/shared-columns/StandardColumnCellRender";
import ColorSquareCellRenderer from "../components/column-actions/ColorSquareCellRenderer";
import { type ColDef } from "ag-grid-community";

const EventColumnDefs: ColDef[] = [
  {
    headerName: "Event",
    field: "event",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 0.5,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Description",
    field: "description",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 0.8,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Start Date",
    field: "startDate",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 0.6,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "End Date",
    field: "endDate",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 0.6,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Event For",
    field: "eventFor",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 0.5,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Event Type",
    field: "eventType",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 0.5,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "EventColor",
    field: "eventColor",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 0.6,
    cellRenderer: ColorSquareCellRenderer,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    headerName: "Active",
    field: "active",
    sortable: true,
    resizable: true,
    minWidth: 120,
    maxWidth: 120,
    cellRenderer: StandardColumnCellRender,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
];

export default EventColumnDefs;