import type { Field } from "@/types/formTypes";

const TopicFields: Field[] = [
  {
    name: "lessonId",
    label: "Lesson",
    placeholder: "Choose a lesson",
    type: "select",
    options: [], 
    validationRules: {
      required: true,
    },
  },
  {
    name: "topicDescriptions",
    label: "Topic Descriptions",
    placeholder: "Enter topic descriptions",
    type: "string-array",
    validationRules: {
      required: true,
      minItems: 1,
    },
  },
];

export default TopicFields;