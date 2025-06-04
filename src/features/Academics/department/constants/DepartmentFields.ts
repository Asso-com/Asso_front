import type { Field } from "@/types/formTypes";

export const DepartmentFields: Field[] = [
    {
        name: "name",
        type: "text",
        label: "Department",
        placeholder: "Department",
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

export default DepartmentFields;
