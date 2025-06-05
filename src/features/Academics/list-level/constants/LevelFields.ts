import type { Field } from "@/types/formTypes";

export const LevelFields: Field[] = [
    {
        name: "code",
        type: "text",
        label: "Code",
        placeholder: "Code",
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

    {
        name: "order",
        type: "text",
        label: "Order",
        placeholder: "Order",
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

export default LevelFields;
