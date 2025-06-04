import type { Field } from "@/types/formTypes";

export const LevelCategoriesFields: Field[] = [
  {
    name: "description",
    type: "textarea",
    label: "School Year",
    placeholder: "School Year",
    validationRules: {
      required: true,
      maxLength: 100,
    },
  },
  {
    name: "dayOfWeek",
    type: "select",
    label: "Start Day",
    placeholder: "Start Day",
    options: [
      { value: "MONDAY", label: "Monday" },
      { value: "TUESDAY", label: "Tuesday" },
      { value: "WEDNESDAY", label: "Wednesday" },
      { value: "THURSDAY", label: "Thursday" },
      { value: "FRIDAY", label: "Friday" },
      { value: "SATURDAY", label: "Saturday" },
      { value: "SUNDAY", label: "Sunday" },
    ],
    validationRules: {
      required: true,
    },
  },
  {
    name: "startDate",
    type: "date",
    label: "Starting Date",
    placeholder: "Select Date",
    validationRules: {
      required: true,
    },
  },
  {
    name: "endDate",
    type: "date",
    label: "Ending Date",
    placeholder: "Select Date",
    validationRules: {
      required: true,
      isAfter: {
        field: "startDate",
        message: "Ending date must be after starting date",
      },
    },
  },
];

export default LevelCategoriesFields;
