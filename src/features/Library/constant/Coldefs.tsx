import type { ColDef } from "ag-grid-community";
import { Image } from "@chakra-ui/react";
import StandardColumnCellRender from "@components/shared/shared-columns/StandardColumnCellRender";
import React from "react";

const BookColDefs: ColDef[] = [
  {
    headerName: "Cover",
    field: "isbnNo",
    sortable: false,
    filter: false,
    width: 100,
    minWidth: 100,
    cellRenderer: (params: { value: any }) => {
      if (!params.value) return React.createElement("span", {}, "—");

      const isbn = params.value.toString().replace(/[-\s]/g, ""); // Clean ISBN
      const imageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

      return React.createElement(Image, {
        src: imageUrl,
        alt: "Book cover",
        width: "50px",
        height: "70px",
        objectFit: "cover",
        borderRadius: "4px",
        cursor: "pointer",
        fallbackSrc:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA1MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNUgyNVYzMEgyMFYyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN0ZWIgZD0iTTIwIDM1SDMwVjM3SDIwVjM1WiIgZmlsbD0iIzlDQTNBRiIvPgo8c3RlYiBkPSJNMjAgNDBIMzBWNDJIMjBWNDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=",
        title: "Click to view larger image",
      });
    },
  },
  {
    headerName: "Book Title",
    field: "bookTitle",
    filter: true,
    width: 250,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "ISBN",
    field: "isbnNo",
    sortable: true,
    filter: true,
    width: 200,
    minWidth: 150,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Publisher",
    field: "publish",
    sortable: true,
    filter: true,
    cellRenderer: (params: { value: any }) => params.value || "—",
  },
  {
    headerName: "Author",
    field: "author",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Subject",
    field: "subject",
    sortable: true,
    filter: true,
    width: 200,
    minWidth: 150,
    cellStyle: { textAlign: "left" },
  },
  {
    headerName: "Rack No",
    field: "rackNo",
    sortable: true,
    filter: true,
    cellRenderer: (params: { value: any }) => params.value || "—",
  },

  {
    headerName: "Quantity",
    field: "qty",
    sortable: true,
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Price",
    field: "perUnitCost",
    sortable: true,
    filter: "agNumberColumnFilter",
    valueFormatter: (params) => `$${params.value.toFixed(2)}`,
  },
  {
    headerName: "Post Date",
    field: "postDate",
    sortable: true,
    filter: "agDateColumnFilter",
    valueFormatter: (params) =>
      new Date(params.value).toLocaleDateString("en-GB"),
  },
  {
    headerName: "Description",
    field: "description",
    sortable: false,
    filter: false,
    tooltipField: "description",
    cellRenderer: (params: { value: any }) =>
      params.value?.length > 50
        ? params.value.slice(0, 50) + "..."
        : params.value,
  },
  {
    headerName: "Available",
    field: "available",
    sortable: true,
    filter: true,
    cellRenderer: StandardColumnCellRender,
  },
  {
    headerName: "Active",
    field: "isActive",
    sortable: true,
    filter: true,
     cellRenderer: StandardColumnCellRender,
  },
];

export default BookColDefs;
