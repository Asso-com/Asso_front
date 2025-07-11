import * as Yup from "yup";
import type { Field } from "@/types/formTypes";

export const ReunionFields: Field[] = [
  {
    name: "date",
    type: "datetime-local",
    label: "Reunion Date",
    placeholder: "Select a date",
    validationRules: {
      required: true,
    },
  },
  {
    name: "topic",
    type: "text",
    label: "Topic",
    placeholder: "Enter the topic",
    validationRules: {
      required: true,
      maxLength: 255,
    },
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Describe the topic",
    validationRules: {
      maxLength: 500,
    },
  },
  {
    name: "familyIds",
    type: "multiselect",
    label: "Concerned Families",
  },
];

export const validationSchema = (isAllFamilies: boolean) =>
  Yup.object().shape({
    date: Yup.string()
      .required("Date is required")
      .matches(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
        "Expected format: yyyy-MM-ddTHH:mm"
      ),
    topic: Yup.string().required("Topic is required"),
    description: Yup.string().required("Description is required"),
    associationId: Yup.number().required("Association ID is required"),
    familyIds: Yup.array()
      .of(Yup.string().uuid("Invalid family ID"))
      .when([], {
        is: () => !isAllFamilies,
        then: (schema) => schema.min(1, "Please select at least one family"),
        otherwise: (schema) => schema,
      }),
  });
