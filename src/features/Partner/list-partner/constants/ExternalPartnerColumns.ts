// ✅ IMPORT CORRECT
import type { ColDef } from "ag-grid-community";
import { Badge } from "@chakra-ui/react";
import React from "react";

// ✅ RENDERER POUR STATUS BADGES (OPTIMISÉ STYLE SUBJECT)
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
      maxWidth: '200px'
    }
  }, address);
};

// ✅ RENDERER POUR NOM AVEC STYLE PRINCIPAL (comme Subject)
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

// ✅ DÉFINITION DES COLONNES (STYLE SUBJECT)
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
      suppressMovable: true,
      filter: false,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Association Name",
      minWidth: 250,
      flex: 2,                    // ✅ FLEX 2 comme Subject (plus large)
      cellRenderer: NameRenderer, // ✅ RENDERER CUSTOM pour style
      tooltipField: "name",
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
      sortable: true,
      resizable: true,
    },
    {
      field: "associationIdentifier",
      headerName: "Identifier",
      minWidth: 150,
      flex: 1,
      filter: "agTextColumnFilter",
      cellStyle: { 
        fontFamily: 'monospace', 
        fontSize: '12px',
        color: '#4A5568'
      },
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
    },
    {
      field: "shortTitle",
      headerName: "Short Title",
      minWidth: 180,
      flex: 1,
      tooltipField: "shortTitle",
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 130,
      flex: 1,
      filter: "agSetColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      maxWidth: 120,           // ✅ LARGEUR FIXE comme Subject
      cellRenderer: StatusRenderer,
      filter: "agSetColumnFilter",
      filterParams: {
        values: ['Active', 'Inactive', 'Unknown'],
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
      cellStyle: { 
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",
      },
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 220,
      flex: 1,
      cellRenderer: AddressRenderer,
      tooltipField: "address",
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
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
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
    },
    {
      field: "department",
      headerName: "Department",
      minWidth: 130,
      flex: 1,
      filter: "agSetColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
    },
  ];
};

export default ExternalPartnerColumns;