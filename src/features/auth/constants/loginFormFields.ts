import type { Field } from "../../../types/formTypes";

const loginFormFields: Field[] = [
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
    {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "********",
        validationRules: {
            minLength: 3,
            maxLength: 50,
            required: true,
        },
    },
]

export default loginFormFields;