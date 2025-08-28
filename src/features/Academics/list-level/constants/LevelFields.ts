import type { Field } from "@/types/formTypes";

export const LevelFields: Field[] = [
    {
        name: "categoryId",
        type: "select",
        label: "Categorie",
        placeholder: "Categorie",
        options: [],
        validationRules: {
            required: true,
            maxLength: 100,
        },
    },
    {
        name: "name",
        type: "text",
        label: "Level",
        placeholder: "Level",
        validationRules: {
            required: true,
            maxLength: 100,
        },
    },
];

export default LevelFields;
