// constants/eventCreationFields.ts
import type { Field } from "@/types/formTypes";

export const eventFormFields: Field[] = [
  {
    name: "eventColor",
    label: "Event Color",
    type: "color",
    validationRules: { required: true },
  },
  {
    name: "eventFor",
    label: "Event For",
    type: "select",
    options: [
      { label: "All", value: "all" },
      { label: "Students", value: "students" },
      { label: "Teachers", value: "teachers" }, 
    ],
    validationRules: { required: true },
  },
];
