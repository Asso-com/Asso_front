import { type ColDef } from "ag-grid-community";

// Helper to get reunion status from a date
function getStatusFromDate(
  dateStr: string
): "Finished" | "Ending Soon" | "Coming Soon" | "Upcoming" {
  if (!dateStr) return "Upcoming";

  const now = new Date();
  const reunionDate = new Date(dateStr);

  // Normalize dates to midnight to compare only by day
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(
    reunionDate.getFullYear(),
    reunionDate.getMonth(),
    reunionDate.getDate()
  );

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Finished";
  if (diffDays <= 2) return "Ending Soon";
  if (diffDays <= 7) return "Coming Soon";
  return "Upcoming";
}

const ReunionColumnDefs: ColDef[] = [
  {
    headerName: "Date",
    field: "date",
    sortable: true,
    filter: "agDateColumnFilter",
    resizable: true,
    minWidth: 160,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Topic",
    field: "topic",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Description",
    field: "description",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    flex: 1,
    minWidth: 250,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Families",
    field: "families",
    minWidth: 300,
    flex: 1,
    cellRenderer: (params: any) => {
      if (!params.value || !Array.isArray(params.value)) return "-";

      return (
        <div
          style={{
            maxHeight: "100px",
            overflowY: "auto",
            whiteSpace: "normal",
            lineHeight: "1.5",
            paddingRight: "4px",
          }}
        >
          {params.value.map((family: any, idx: number) => {
            const father = family.father
              ? `${family.father.lastName?.toUpperCase() ?? ""} ${
                  family.father.firstName ?? ""
                }`.trim()
              : "-";
            const mother = family.mother
              ? `${family.mother.lastName?.toUpperCase() ?? ""} ${
                  family.mother.firstName ?? ""
                }`.trim()
              : "-";
            return (
              <div key={idx} style={{ paddingLeft: "8px" }}>
                • {father} & {mother}
              </div>
            );
          })}
        </div>
      );
    },
    cellStyle: {
      textAlign: "left",
    },
  },
  {
    headerName: "Status",
    field: "date",
    sortable: true,
    filter: false,
    width: 140,
    pinned: "left",
    cellStyle: {
      textAlign: "center",
      padding: "8px 4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    cellRenderer: (params: any) => {
      const status = getStatusFromDate(params.value);

      const colors = {
        Finished: {
          text: "Finished",
          bg: "#f3f4f6",
          color: "#6b7280",
          dot: "#6b7280",
        },
        "Ending Soon": {
          text: "Ending Soon",
          bg: "#fed7aa",
          color: "#c2410c",
          dot: "#c2410c",
        },
        "Coming Soon": {
          text: "Coming Soon",
          bg: "#fef3c7",
          color: "#a16207",
          dot: "#a16207",
        },
        Upcoming: {
          text: "Upcoming",
          bg: "#d1fae5",
          color: "#065f46",
          dot: "#065f46",
        },
      };

      const color = colors[status];

      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 600,
            color: color.color,
            padding: "3px 10px",
            borderRadius: "12px",
            backgroundColor: color.bg,
            height: "26px",
            userSelect: "none",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: color.dot,
            }}
          />
          {color.text}
        </div>
      );
    },
  },
];

export default ReunionColumnDefs;
