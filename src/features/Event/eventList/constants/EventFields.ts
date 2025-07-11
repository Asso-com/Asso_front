import type { Field } from "@/types/formTypes";

const EventFormFields: Field[] = [
  {
    name: "startDate",
    label: "Start Date",
    type: "date",
    placeholder: "Select a start date",
    validationRules: { required: true },
  },
  {
    name: "endDate",
    label: "End Date",
    type: "date",
    placeholder: "Select an end date",
    validationRules: { required: true },
  },
  {
    name: "eventType",
    label: "Event Type",
    type: "select",
    placeholder: "Choose an event type",
    options: [
      { label: "Task", value: "TASK" },
      { label: "Public", value: "PUBLIC" },
      { label: "Session", value: "SESSION" },
    ],
    validationRules: { required: true },
  },
  {
    name: "eventColor",
    label: "Event Color",
    type: "color",
    placeholder: "Pick a color",
    validationRules: { required: true },
    inputProps: {
      format: "hex",
    },
  },
  {
    name: "eventFor",
    label: "Event For",
    type: "select",
    options: [
      { label: "All", value: "ALL" },
      { label: "Public", value: "PUBLIC" },
      { label: "Students", value: "STUDENTS" },
    ],
    validationRules: { required: true },
  },
  {
    name: "eventPoster",
    label: "Event Poster",
    type: "file",
    placeholder: "Upload a poster (image or PDF)",
    validationRules: { required: false },
    inputProps: {
      accept: ".png, .jpg, .jpeg, .pdf",
    },
  },
];

export default EventFormFields;
