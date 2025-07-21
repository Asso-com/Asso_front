import type { Field } from "@/types/formTypes"


const PartnersFields: Field[] = [
    {
        name: "assiduityCoefficient",
        label: "Assiduity Coefficient",
        type: "number",
        placeholder: "Enter assiduity coefficient",
        validationRules: {
            required: true,
            min: 1,
        },
    },
    {
        name: "assiduityCoefficient",
        label: "Participation Coefficient",
        type: "number",
        placeholder: "Enter participation coefficient",
        validationRules: {
            required: true,
            min: 1,
        },
    },
    {
        name: "quizCoefficient",
        label: "Quiz Coefficient",
        type: "number",
        placeholder: "Enter quiz coefficient",
        validationRules: {
            required: true,
            min: 1,
        },
    },
    {
        name: "delayBeforeAttendance",
        label: "Delay Before Attendance",
        type: "number",
        placeholder: "Enter delay before attendance",
        validationRules: {
            required: true,
            max: 15,
            min: 0,
        },
    },
    {
        name: "currency",
        type: "select",
        label: "Currency",
        placeholder: "Select currency",
        options: [
            { value: "USD", label: "US Dollar (USD)" },
            { value: "EUR", label: "Euro (EUR)" },
            { value: "GBP", label: "British Pound (GBP)" },
            { value: "JPY", label: "Japanese Yen (JPY)" },
        ],
        validationRules: {
            required: true,
        },
    },
    {
        name: "currencySymbol",
        type: "text",
        label: "Currency Symbol",
        placeholder: "$, €, £, etc.",
        validationRules: {
            required: true,
            maxLength: 3,
        },
    },
]

export default PartnersFields