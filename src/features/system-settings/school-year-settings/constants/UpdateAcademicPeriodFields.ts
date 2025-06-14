import type { Field } from "@/types/formTypes";

export const UpdateAcademicPeriodFields: Field[] = [
    {
        name: "description",
        type: "textarea",
        label: "School Year",
        placeholder: "School Year",
        validationRules: {
            required: true,
            maxLength: 100,
        },
    },
    {
        name: "endDate",
        type: "date",
        label: "Ending Date",
        placeholder: "Select Date",
        validationRules: {
            required: true,
        },
    },
];

export default UpdateAcademicPeriodFields;
