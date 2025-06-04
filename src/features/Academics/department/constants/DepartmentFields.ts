import type { Field } from "@/types/formTypes";

export const DepartmentFields: Field[] = [
    {
        name: "Code",
        type: "text",
        label: "Code",
        placeholder: "Code",
        validationRules: {
            required: true,
            maxLength: 100,
        },
    },
     
    {
        name: "Department",
        type: "text",
        label: "Department",
        placeholder: "Department",
        validationRules: {
            required: true,
        },
    },
    
];

export default DepartmentFields;
