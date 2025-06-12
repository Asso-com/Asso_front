import type { Field } from "@/types/formTypes";

export const StaffFields: Field[] = [
    {
        name: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "Enter first name",
        validationRules: {
            required: true,
            maxLength: 100
        }
    },
    {
        name: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Enter last name",
        validationRules: {
            required: true,
            maxLength: 100
        }
    },
    {
        name: "email",
        type: "email",
        label: "Email Address",
        placeholder: "example@domain.com",
        validationRules: {
            required: true,
            email: true
        }
    },
    {
        name: "mobileNumber",
        type: "phone",
        label: "Mobile Number",
        placeholder: "Enter mobile number",
        validationRules: {
            required: true,
        }
    },
    {
        name: "address",
        type: "text",
        label: "Address",
        placeholder: "Enter address",
        validationRules: {
            required: true,
            maxLength: 200
        }
    },
    {
        name: "city",
        type: "text",
        label: "City",
        placeholder: "Enter city",
        validationRules: {
            required: true,
            maxLength: 100
        }
    },
    {
        name: "zipCode",
        type: "text",
        label: "ZIP code",
        placeholder: "Enter zip code",

    },
    {
        name: "state",
        type: "text",
        label: "State",
        placeholder: "Enter state",
        validationRules: {
            maxLength: 100
        }
    },
    {
        name: "comment",
        type: "textarea",
        label: "Comments",
        placeholder: "Enter comments",
        validationRules: {
            maxLength: 500
        }
    },
    {
        name: "basicSalary",
        type: "number",
        label: "Base Salary",
        placeholder: "Enter base salary",
        validationRules: {
            required: true,
            min: 0
        }
    },
    {
        name: "jobCategory",
        type: "select",
        label: "Job Category",
        options: [
            { label: "Administrateur", value: "ADMIN" },
            { label: "Bibliothécaire", value: "BIBLIOTHECAIRE" },
            { label: "Comptable", value: "COMPTABLE" },
            { label: "Enseignement", value: "ENSEIGNEMENT" },
            { label: "Réceptionniste", value: "RECEPTIONNISTE" },
            { label: "Super Admin", value: "SUPER_ADMIN" }
        ],
        validationRules: {
            required: true
        }
    },
    {
        name: "dateOfJoining",
        label: "Date d'adhésion",
        type: "date",
    },
    {
        name: "isActive",
        type: "checkbox",
        label: "Active Status",
        defaultValue: true
    }
];

export default StaffFields;