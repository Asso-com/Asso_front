import type { Field } from "@/types/formTypes";

export const familyEditableFields: Field[] = [
  {
    name: "observation",
    type: "textarea",
    label: "Observation",
    placeholder: "Observation",
  },
  {
    name: "blacklist",
    type: "checkbox",
    label: "Blacklisted",
  },
];
