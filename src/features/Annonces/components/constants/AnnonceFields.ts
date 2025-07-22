import type { Field } from "@/types/formTypes";

export const AnnonceFields: Field[] = [
  {
    name: "titre",
    label: "Titre",
    type: "text",
    placeholder: "Entrez le titre de l'annonce",
    validationRules: { required: true, maxLength: 100 },
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Entrez la description de l'annonce",
    validationRules: { required: true },
  },
  {
    name: "type",
    label: "Type d'annonce",
    type: "select",
    placeholder: "Sélectionnez le type",
    validationRules: { required: true },
    options: [
      { value: "IN", label: "Annonce IN" },
      { value: "OUT", label: "Annonce OUT" },
    ],
  },
];

export default AnnonceFields;