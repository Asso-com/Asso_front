import { type ColDef } from "ag-grid-community";
import i18next from "i18next";

const t = i18next.t.bind(i18next);

const FamilyColumnDefs: ColDef[] = [
  {
    headerName: t("Father Name"),
    field: "fatherName",
    valueGetter: (params: any) => {
      const father = params.data?.father;
      return father
        ? `${father.firstName ?? ""} ${father.lastName ?? ""}`.trim()
        : t("N/A");
    },
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 180,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: t("Father Email"),
    field: "fatherEmail",
    valueGetter: (params: any) => params.data?.father?.email ?? t("N/A"),
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: t("Father Address"),
    field: "fatherAddress",
    valueGetter: (params: any) => params.data?.father?.address ?? t("N/A"),
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 220,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: t("Mother Name"),
    field: "motherName",
    valueGetter: (params: any) => {
      const mother = params.data?.mother;
      return mother
        ? `${mother.firstName ?? ""} ${mother.lastName ?? ""}`.trim()
        : t("N/A");
    },
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 180,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: t("Mother Email"),
    field: "motherEmail",
    valueGetter: (params: any) => params.data?.mother?.email ?? t("N/A"),
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: t("Mother Address"),
    field: "motherAddress",
    valueGetter: (params: any) => params.data?.mother?.address ?? t("N/A"),
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 220,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: t("Observation"),
    field: "observation",
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: true,
    minWidth: 200,
    flex: 1,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: t("Blacklisted"),
    field: "blacklist",
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
      const isBlacklisted = params.value;
      return (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "13px",
            fontWeight: 500,
            color: isBlacklisted ? "#dc2626" : "#059669",
            padding: "2px 6px",
            borderRadius: "4px",
            backgroundColor: isBlacklisted ? "#fef2f2" : "#ecfdf5",
            border: `1px solid ${isBlacklisted ? "#fecaca" : "#a7f3d0"}`,
            height: "20px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: isBlacklisted ? "#dc2626" : "#059669",
            }}
          />
          {isBlacklisted ? t("Yes") : t("No")}
        </div>
      );
    },
  },
];

export default FamilyColumnDefs;
