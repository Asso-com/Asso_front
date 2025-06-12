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
        }
    },
    {
        name: "jobCategory",
        type: "select",
        label: "Job Category",
        options: [
            { label: "Administrateur", value: "ADMINISTRATOR" },
            { label: "Bibliothécaire", value: "BIBLIOTHECAIRE" },
            { label: "Comptable", value: "COMPTABLE" },
            { label: "Enseignement", value: "ENSEIGNEMENT" },
            { label: "Réceptionniste", value: "RECEPTIONNISTE" },
        ],
        validationRules: {
            required: true
        }
    },
    {
        name: "dateOfJoining",
        label: "Date d'adhésion",
        type: "date",
        placeholder: "Select Date",
        validationRules: {
            required: true,
        }
    },
    {
        name: "dateOfLeaving",
        label: "Date d'adhésion",
        type: "date",
        placeholder: "Select Date",
        validationRules: {
            required: true,
            isAfter: {
                field: "dateOfJoining",
                message: "Ending date must be after joining date"
            }
        }
    },
];

export default StaffFields;