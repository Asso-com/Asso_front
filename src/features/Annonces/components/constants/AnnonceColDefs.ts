const AnnonceColDefs = () => {
  return [

    {
      headerName: "Titre",
      field: "titre",
      flex: 1,
      minWidth: 200,
    },
    {
      headerName: "Description",
      field: "description",
      flex: 2,
      minWidth: 300,
    },
    {
      headerName: "Type",
      field: "type",
      width: 130,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      width: 180,
      valueFormatter: (params: any) => {
        if (!params.value) return "";
        return new Date(params.value).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      },
    },
    {
      headerName: "Updated At",
      field: "updatedAt",
      width: 180,
      valueFormatter: (params: any) => {
        if (!params.value) return "";
        return new Date(params.value).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      },
    },
  ];
};

export default AnnonceColDefs;