// constants/EventFormFields.ts
import type { Field } from "@/types/formTypes";

export const eventFormFields: Field[] = [
  {
    name: "title",
    label: "Event Title",
    type: "text",
    validationRules: { required: true },
    placeholder: "Enter event title",
  },
  {
    name: "description",
    label: "Event Description",
    type: "textarea",
    validationRules: { required: true },
    placeholder: "Enter event description",
  },
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
      { label: "All", value: "ALL" },
      { label: "Students", value: "STUDENTS" },
      { label: "Teachers", value: "TEACHERS" },
    ],
    validationRules: { required: true },
  },
  {
    name: "eventPoster",
    label: "Event Poster",
    type: "file",
    validationRules: { required: false },
  },
];