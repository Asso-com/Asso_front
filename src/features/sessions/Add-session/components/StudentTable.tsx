import { forwardRef } from "react";
import { Box } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import type { ColDef } from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import type { Student } from "../types/addsession.types";
import type { Ref } from "react";
import { useTranslation } from "react-i18next";

interface StudentTableProps {
  students: Student[];
  selectedStudents: string[];
  onStudentToggle: (matricule: string) => void;
}
const renderLevelCell = (params: any) => (
  <span
    style={{
      backgroundColor: "rgba(0, 112, 243, 0.1)",
      color: "#0070f3",
      padding: "4px 8px",
      borderRadius: "999px",
      fontSize: "14px",
    }}
  >
    {params.value}
  </span>
);

const renderCheckboxCell = (
  params: any,
  selectedStudents: string[],
  onStudentToggle: (matricule: string) => void
) => (
  <input
    type="checkbox"
    checked={selectedStudents.includes(params.data.matricule)}
    onChange={() => onStudentToggle(params.data.matricule)}
    style={{
      width: "16px",
      height: "16px",
      cursor: "pointer",
    }}
  />
);

const StudentTable = forwardRef<AgGridReact<any>, StudentTableProps>(
  ({ students, selectedStudents, onStudentToggle }, ref) => {
    const { t } = useTranslation();
    const columnDefs: ColDef[] = [
      {
        field: "select",
        headerName: "Select",
        width: 120,
        pinned: "left",
        cellRenderer: (params: any) =>
          renderCheckboxCell(params, selectedStudents, onStudentToggle),
        sortable: false,
        filter: false,
        resizable: false,
      },
      {
        field: "matricule",
        headerName: t("Matricule"),
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        field: "prenom",
        headerName: t("First Name"),
        flex: 2,
        filter: "agTextColumnFilter",
      },
      {
        field: "nom",
        headerName: t("Last Name"),
        flex: 2,
        filter: "agTextColumnFilter",
      },
      {
        field: "niveau",
        headerName: t("Level"),
        flex: 1,
        cellRenderer: renderLevelCell,
        filter: "agSetColumnFilter",
      },
    ];

    return (
      <Box w="100%" h="100%">
        <CustomAgGrid
          ref={ref as Ref<AgGridReact<any>>}
          rowData={students}
          columnDefs={columnDefs}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={10}
          enableRangeSelection={true}
          suppressRowClickSelection={true}
          defaultColDef={{
            sortable: true,
            resizable: true,
            flex: 1,
          }}
          animateRows={true}
        />
      </Box>
    );
  }
);

StudentTable.displayName = "StudentTable";

export default StudentTable;
