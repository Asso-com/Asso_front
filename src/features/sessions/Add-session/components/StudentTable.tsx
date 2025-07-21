import { forwardRef, useState, useMemo } from "react";
import { Box, Text, Icon, Button, ButtonGroup } from "@chakra-ui/react";
import CustomAgGrid from "@components/shared/ag-grid/CustomAgGrid";
import QuickFilter from "@components/shared/QuickFilter";
import ClearFilter from "@components/shared/ClearFilter";
import type { ColDef } from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import type { Student } from "../types/addsession.types";
import { WarningIcon, CheckIcon } from "@chakra-ui/icons";
import type { Ref } from "react";
import { useTranslation } from "react-i18next";
import { useColorModeValue } from "@chakra-ui/react";

interface StudentTableProps {
  students: Student[];
  selectedStudents: string[];
  onStudentToggle: (studentId: string) => void;
  maxCapacity: number;
  categoryId?: number;
  levelName?: string;
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
  onStudentToggle: (studentId: string) => void
) => (
  <input
    type="checkbox"
    checked={selectedStudents.includes(params.data.studentId)}
    onChange={() => onStudentToggle(params.data.studentId)}
    style={{
      width: "16px",
      height: "16px",
      cursor: "pointer",
    }}
  />
);

const StudentTable = forwardRef<AgGridReact<any>, StudentTableProps>(
  ({ students, selectedStudents, onStudentToggle, maxCapacity, categoryId, levelName}, ref) => {
    const { t } = useTranslation();
    const textColor = useColorModeValue("gray.700", "gray.100");
    const headerBg = useColorModeValue("gray.50", "gray.700");
    const selectedCount = selectedStudents.length;
        const [activeFilter, setActiveFilter] = useState<'levelName' | 'all'>('levelName');
    const filteredStudents = useMemo(() => {
      if (categoryId === 1) {
        if (activeFilter === 'levelName' && levelName) {
          return students.filter(student => student.levelName === levelName);
        }
        return students;
      } else {
        return levelName
          ? students.filter(student => student.levelName === levelName)
          : students;
      }
    }, [students, activeFilter, levelName, categoryId]);

    const columnDefs: ColDef[] = [
      {
        field: "select",
        headerName: t("Select"),
        width: 120,
        pinned: "left",
        cellRenderer: (params: any) =>
          renderCheckboxCell(params, selectedStudents, onStudentToggle),
        sortable: false,
        filter: false,
        resizable: false,
      },
      {
        field: "registrationId",
        headerName: t("Registration ID"),
        flex: 1,
        filter: "agTextColumnFilter",
      },
      {
        field: "studentName",
        headerName: t("Name"),
        flex: 1.5,
        filter: "agTextColumnFilter",
      },
      {
        field: "levelName",
        headerName: t("Level"),
        flex: 1.5,
        cellRenderer: renderLevelCell,
        filter: "agSetColumnFilter",
      },
    ];

    return (
      <Box w="100%" h="100%" display="flex" flexDirection="column">
        <Box
          p={4}
          bg={headerBg}
          display="flex"
          alignItems="center"
          gap={4}
          borderBottom="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <Text fontSize="lg" fontWeight="semibold" color={textColor} flexShrink={0}>
            {t("Students List")}
          </Text>
          
          {(categoryId === 1) && (
            <ButtonGroup size="sm" isAttached variant="outline">
              <Button
                colorScheme={activeFilter === 'levelName' ? 'blue' : 'gray'}
                onClick={() => setActiveFilter('levelName')}
                isDisabled={!levelName}
              >
                {levelName ? t(levelName) : ""}
              </Button>
              <Button
                colorScheme={activeFilter === 'all' ? 'blue' : 'gray'}
                onClick={() => setActiveFilter('all')}
              >
                {t('All')}
              </Button>
            </ButtonGroup>
          )}
          
          <QuickFilter
            gridRef={ref as React.RefObject<AgGridReact<any>>}
            placeholder={t("Search students by name or matricule...")}
          />
          <ClearFilter gridRef={ref as React.RefObject<AgGridReact<any>>} />
          
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            bg={selectedCount > maxCapacity ? "red.50" : "gray.50"}
            px={3}
            py={2}
            borderRadius="md"
            border="1px solid"
            borderColor={selectedCount > maxCapacity ? "red.200" : "gray.200"}
            flexShrink={0}
          >
            <Icon 
              as={selectedCount > maxCapacity ? WarningIcon : CheckIcon} 
              color={selectedCount > maxCapacity ? "red.500" : "green.500"}
              boxSize={4}
            />
            <Text
              fontSize="sm"
              fontWeight="medium"
              color={selectedCount > maxCapacity ? "red.600" : "gray.600"}
              whiteSpace="nowrap"
            >
              {selectedCount} / {maxCapacity}
            </Text>
          </Box>
        </Box>
        
        <Box flex={1} h="100%">
          <CustomAgGrid
            ref={ref as Ref<AgGridReact<any>>}
            rowData={filteredStudents}
            columnDefs={columnDefs}
            rowSelection="multiple"
            pagination={true}
            paginationPageSize={10}
            suppressRowClickSelection={true}
            defaultColDef={{
              sortable: true,
              resizable: true,
              flex: 1,
            }}
            animateRows={true}
          />
        </Box>
      </Box>
    );
  }
);

StudentTable.displayName = "StudentTable";

export default StudentTable;