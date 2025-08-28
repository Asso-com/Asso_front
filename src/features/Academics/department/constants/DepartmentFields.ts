import type { Field } from "@/types/formTypes";

export const DepartmentFields: Field[] = [
    {
        name: "name",
        type: "text",
        label: "Department",
        placeholder: "Department",
        validationRules: {
            required: true,
            maxLength: 80,
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
    // {
    //     name: "selectedCodes",
    //     label: "Select Codes",
    //     type: "multi-select-checkbox",
    //     //type: "multi-select-checkbox",
    //     options: [
    //         { label: "Code 1", value: 1 },
    //         { label: "Code 2", value: 2 },
    //         { label: "Code 3", value: 3 },
    //         { label: "Code 4", value: 4 },
    //         { label: "Code 5", value: 5 },
    //         { label: "Code 6", value: 6 },
    //         { label: "Code 7", value: 7 },
    //     ],
    //     validationRules: {
    //         required: true,
    //         minItems: 1,
    //     },
    // },
    // {
    //     name: "managers",
    //     type: "string-array",
    //     label: "Department Managers",
    //     placeholder: "Enter manager names",
    //     validationRules: {
    //         required: true,
    //         minLength: 3,
    //         maxLength: 100,
    //         minItems: 1,
    //         maxItems: 10
    //     },
    // }
];

export default DepartmentFields;
