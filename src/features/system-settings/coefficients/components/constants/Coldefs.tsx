import React from "react";
import { useTranslation } from "react-i18next";
import type { ColDef } from "ag-grid-community";

const getCoefficientColumnDefs = (): ColDef[] => {
  const { t } = useTranslation();
  
  return [
    {
      field: "id",
      headerName: t("ID"),
      width: 80,
    },
    {
      field: "assiduity_coefficient",
      headerName: t("Assiduity"),
      minWidth: 120,
    },
    {
      field: "delay_before_attendance",
      headerName: t("Delay"),
      minWidth: 120,
    },
    {
      field: "participation_coefficient",
      headerName: t("Participation"),
      minWidth: 150,
    },
    {
      field: "quiz_coefficient",
      headerName: t("Quiz"),
      minWidth: 100,
    },
    {
      field: "updated_at",
      headerName: t("Last Update"),
      minWidth: 200,
    }
  ];
};

export default getCoefficientColumnDefs;