export const AnnonceFields = [
  {
    name: "titre",
    label: "Titre",
    type: "text" as const,
    placeholder: "Entrez le titre de l'annonce",
    validationRules: { required: true, maxLength: 100 },
  },
  {
    name: "description",
    label: "Description",
    type: "textarea" as const,
    placeholder: "Entrez la description de l'annonce",
    validationRules: { required: true },
    rows: 4,
  },
  {
    name: "type",
    label: "Type d'annonce",
    type: "select" as const,
    placeholder: "Sélectionnez le type",
    validationRules: { required: true },
    options: [
      { value: "IN", label: "Annonce IN" },
      { value: "OUT", label: "Annonce OUT" },
    ],
  },
];

export default AnnonceFields;