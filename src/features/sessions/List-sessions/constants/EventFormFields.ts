// constants/EventFormFields.ts
import type { Field } from "@/types/formTypes";

export const eventFormFields: Field[] = [
  {
    name: "title",
    label: "Event Title",
    type: "text",
    validationRules: {
      required: true,
      maxLength: 255,
    },
    placeholder: "Enter event title",
  },
  {
    name: "description",
    label: "Event Description",
    type: "textarea",
    validationRules: { required: true, maxLength: 1000 },
    placeholder: "Enter event description",
  },
  {
    name: "eventColor",
    label: "Event Color",
    type: "color",
    validationRules: { required: true },
  },
  {
    name: "eventPoster",
    label: "Event Poster",
    type: "file",
    validationRules: { required: false },
  },
];