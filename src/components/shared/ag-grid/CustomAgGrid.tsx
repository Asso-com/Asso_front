import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

import { AgGridReact } from "ag-grid-react";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useDirection } from "@hooks/useDirection";

interface CustomAgGridProps {
  rowData?: any[];
  colDefs: ColDef[];
  [key: string]: any;
}

const CustomAgGrid = forwardRef<AgGridReactType, CustomAgGridProps>(
  ({ rowData = [], colDefs = [], ...props }, ref) => {
    const { t } = useTranslation();
    const { isRTL } = useDirection();

    const gridRef = useRef<AgGridReactType>(null);
    useImperativeHandle(ref, () => gridRef.current!, []);

    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 50, 100];

    const defaultColDef = useMemo(() => {
      return {
        filter: true,
        resizable: true,
        sortable: true,
        suppressMovable: false,
        cellStyle: {
          textAlign: "left",
        },
      };
    }, []);

    return (
      <Box
        style={{ width: "100%", height: "100%" }}
        className="ag-theme-quartz"
      >
        <AgGridReact
          key={isRTL ? "rtl" : "ltr"}
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs.map((col: ColDef) => ({
            ...col,
            headerName: t(col.headerName ?? col.field ?? ""),
          }))}
          scrollbarWidth={8}
          headerHeight={35}
          defaultColDef={defaultColDef}
          rowHeight={40}
          enableRtl={isRTL}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          {...props}
        />
      </Box>
    );
  }
);

export default CustomAgGrid;
