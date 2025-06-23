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
      maxWidth: '100%' // ✅ Utilise toute la largeur disponible
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

// ✅ DÉFINITION DES COLONNES OPTIMISÉES POUR SCROLL
const ExternalPartnerColumns = (): ColDef[] => {
  return [
    {
      field: "rowIndex",
      headerName: "#",
      width: 70,
      pinned: "left", // ✅ Reste visible lors du scroll
      cellStyle: { 
        fontWeight: 'bold', 
        color: '#2B6CB0',
        textAlign: 'center'
      },
      suppressMovable: true,
      filter: false,
      sortable: false,
      lockPosition: true, // ✅ Verrouille la position
    },
    {
      field: "name",
      headerName: "Association Name",
      width: 300, // ✅ Largeur fixe pour consistency
      cellRenderer: NameRenderer,
      tooltipField: "name",
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
      sortable: true,
      resizable: true,
      pinned: "left", // ✅ Garde la colonne principale visible
    },
    {
      field: "associationIdentifier",
      headerName: "Identifier",
      width: 150,
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
      width: 200,
      cellRenderer: TextRenderer,
      tooltipField: "shortTitle",
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
    },
    {
      field: "object",
      headerName: "Object/Purpose",
      width: 250,
      cellRenderer: TextRenderer,
      tooltipField: "object",
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
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
      width: 250,
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
      width: 150,
      filter: "agSetColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
    },
    {
      field: "nature",
      headerName: "Nature",
      width: 150,
      cellRenderer: TextRenderer,
      tooltipField: "nature",
      filter: "agSetColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
    },
    {
      field: "manager",
      headerName: "Manager",
      width: 180,
      cellRenderer: TextRenderer,
      tooltipField: "manager",
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
    },
    {
      field: "website",
      headerName: "Website",
      width: 200,
      cellRenderer: (params: any) => {
        if (!params.value) return 'N/A';
        return React.createElement('a', {
          href: params.value.startsWith('http') ? params.value : `https://${params.value}`,
          target: '_blank',
          rel: 'noopener noreferrer',
          style: {
            color: '#3182ce',
            textDecoration: 'underline',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block',
            maxWidth: '100%'
          }
        }, params.value);
      },
      tooltipField: "website",
      filter: "agTextColumnFilter",
    },
  ];
};

export default ExternalPartnerColumns;