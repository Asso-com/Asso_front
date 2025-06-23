import type { ColDef } from "ag-grid-community";
import { Badge } from "@chakra-ui/react";
import React from "react";

// ✅ RENDERER POUR STATUS BADGES
const StatusRenderer = (params: any) => {
  const status = params.value || 'Unknown';
  const colorScheme = status === 'Active' ? 'green' : status === 'Inactive' ? 'red' : 'gray';

  return React.createElement(Badge, {
    colorScheme,
    size: 'xs',
    px: 2,
    py: 1.5,
    borderRadius: 'md',
    fontSize: '13px',
    fontWeight: 'medium',
    lineHeight: 1,
  }, status);
};

// ✅ RENDERER POUR DATES
const DateRenderer = (params: any) => {
  if (!params.value) return 'N/A';
  try {
    return new Date(params.value).toLocaleDateString('fr-FR');
  } catch {
    return 'Invalid Date';
  }
};

// ✅ RENDERER POUR ADRESSES LONGUES
const AddressRenderer = (params: any) => {
  const address = params.value || 'N/A';
  return React.createElement('div', {
    title: address,
    style: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%'
    }
  }, address);
};

// ✅ RENDERER POUR NOM AVEC STYLE PRINCIPAL
const NameRenderer = (params: any) => {
  const name = params.value || 'N/A';
  return React.createElement('div', {
    title: name,
    style: {
      fontWeight: '600',
      color: '#2B6CB0',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  }, name);
};

// ✅ RENDERER POUR TEXTE LONG AVEC TOOLTIP
const TextRenderer = (params: any) => {
  const text = params.value || 'N/A';
  return React.createElement('div', {
    title: text,
    style: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%'
    }
  }, text);
};


const ExternalPartnerColumns = (): ColDef[] => {
  return [
    {
      field: "rowIndex",
      headerName: "#",
      width: 70,
      pinned: "left",
      cellStyle: {
        fontWeight: 'bold',
        color: '#2B6CB0',
        textAlign: 'center'
      },
    },
    {
      field: "name",
      headerName: "Association Name",
      width: 300,
      cellRenderer: NameRenderer,
      filter: "agTextColumnFilter",
      pinned: "left",
      cellStyle: {
        textAlign: 'left'
      },
    },
    {
      field: "isPartner",
      headerName: "Already Partner?",
      width: 165,
      valueFormatter: (params) => (params.value ? "Yes" : "No"),
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      field: "associationIdentifier",
      headerName: "Identifier",
      width: 150,
      filter: "agTextColumnFilter",
    },
    {
      field: "manager",
      headerName: "Manager",
      width: 180,
      cellRenderer: TextRenderer,
      filter: "agTextColumnFilter",
      cellStyle: {
        textAlign: 'left'
      },
    },
    {
      field: "shortTitle",
      headerName: "Short Title",
      width: 200,
      cellRenderer: TextRenderer,
      filter: "agTextColumnFilter",
      cellStyle: {
        textAlign: 'left'
      },
    },
    {
      field: "object",
      headerName: "Object/Purpose",
      width: 250,
      cellRenderer: TextRenderer,
      filter: "agTextColumnFilter",
      cellStyle: {
        textAlign: 'left'
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      cellRenderer: StatusRenderer,
      filter: "agTextColumnFilter",
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 250,
      cellRenderer: AddressRenderer,
      tooltipField: "address",
      filter: "agTextColumnFilter",
      cellStyle: {
        textAlign: 'left'
      },
    },
    {
      field: "postalCode",
      headerName: "Postal Code",
      width: 120,
      filter: "agTextColumnFilter",
      cellStyle: {
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#4A5568'
      },
    },
    {
      field: "joinedDate",
      headerName: "Creation Date",
      width: 140,
      cellRenderer: DateRenderer,
      filter: "agDateColumnFilter",
      cellStyle: {
        textAlign: 'center'
      },
    },
  ];
};

export default ExternalPartnerColumns;