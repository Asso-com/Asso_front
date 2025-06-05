import type { Field } from "@/types/formTypes";

export const SubjectFields: Field[] = [
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
];

export default SubjectFields;
