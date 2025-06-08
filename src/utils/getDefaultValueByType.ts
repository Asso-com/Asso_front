import type { Field } from "@/types/formTypes";

type FormValues = Record<string, any>;

export const getDefaultValueByType = (type: string): any => {
    switch (type) {
        case "text":
        case "email":
        case "phone":
        case "password":
        case "textarea":
            return "";

        case "number":
            return 0;

        case "checkbox":
            return false;

        case "multi-select-checkbox":
            return [];
        case "string-array":
            return [""];

        case "date":
        case "file":
            return null;

        case "select":
        case "radio":
            return "";

        default:
            return "";
    }
};

export const getDefaultFormValues = (fields: Field[]): FormValues => {
    return fields.reduce((acc: FormValues, field: Field) => {
        acc[field.name] = field.defaultValue ?? getDefaultValueByType(field.type);
        return acc;
    }, {});
};
