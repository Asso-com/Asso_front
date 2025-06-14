import { type ColDef } from "ag-grid-community";
import { useTranslation } from "react-i18next";

const Coldefs = (): ColDef[] => {
  const { t } = useTranslation();
  return [
    { field: "id", headerName: t("ID"), width: 80, hide: true },
    { field: "assiduity_coefficient", headerName: t("Assiduity"), minWidth: 120 },
    { field: "delay_before_attendance", headerName: t("Delay"), minWidth: 120 },
    { field: "participation_coefficient", headerName: t("Participation"), minWidth: 150 },
    { field: "quiz_coefficient", headerName: t("Quiz"), minWidth: 100 },
    { field: "updated_at", headerName: t("Last Update"), minWidth: 200, hide: true },
  ];
};

export default Coldefs;