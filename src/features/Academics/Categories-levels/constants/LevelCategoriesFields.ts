
import type { Field } from "@/types/formTypes";

const LevelCategoriesFields: Field[] = [
  {
    name: "name",
    type: "text",
    label: "Categorie",
    placeholder: "Categorie",
    validationRules: {
      required: true,
      maxLength: 100,
    },
  },
  {
    name: "description",
    type: "text",
    label: "Description",
    placeholder: "Description",
    validationRules: {
      required: true,
      maxLength: 100,
    },
  },
  {
    name: "active",
    type: "checkbox",
    label: "Active",
    placeholder: "Active",
    validationRules: {
      required: true,
    },
  },
];

export default LevelCategoriesFields;
