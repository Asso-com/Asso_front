import type { Field } from "@/types/formTypes";

export const SubjectFields: Field[] = [
  {
    name: "departmentId",
    type: "select",
    label: "Departments",
    placeholder: "Departments",
    options: [],
    validationRules: {
      required: true,
    },
  },
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Name",
    validationRules: {
      required: true,
      maxLength: 50,
    },
  },
];

export default SubjectFields;
