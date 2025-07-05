import type { Field } from "@/types/formTypes";

export const levelFields: Field[] = [
    {
        name: 'levelId',
        type: 'select',
        label: 'Level/Grade',
        placeholder: 'Select level',
        options: [],
        validationRules: { required: true }
    },
];