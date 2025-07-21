import type { Field } from "@/types/formTypes";

const sendEmailFields: Field[] = [
    {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "john.doe@example.com",
        validationRules: {
            required: true,
            email: true,
            minLength: 3,
            maxLength: 100,
        },
    },
];

export default sendEmailFields