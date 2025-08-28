import type { Field } from "@/types/formTypes";
const EventFormFields: Field[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter event title",
    validationRules: { required: true, maxLength: 255 },
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter event description",
    validationRules: { required: true, maxLength: 1000 },
  },
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
     // { label: "Session", value: "SESSION" },
    ],
    validationRules: { required: true },
  },
  {
    name: "eventColor",
    label: "Event Color",
    type: "color",
    placeholder: "Pick a color",
    validationRules: { required: false },
    inputProps: {
      format: "hex",
    },
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