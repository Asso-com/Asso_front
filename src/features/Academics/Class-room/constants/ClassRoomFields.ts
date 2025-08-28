import type { Field } from "@/types/formTypes";

export const ClassRoomFields: Field[] = [
    {
        name: "name",
        type: "text",
        label: "Name",
        placeholder: "Name",
        validationRules: {
            required: true,
            maxLength: 100,
        },
    },
    {
        name: "description",
        type: "text",
        label: "Description",
        placeholder: "Description",
        validationRules: {
            required: true,
            maxLength: 100,
        },
    },
    {
        name: "capacity",
        type: "number",
        label: "Capacity",
        placeholder: "Capacity",
        validationRules: {
            required: true,
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

export default ClassRoomFields;
