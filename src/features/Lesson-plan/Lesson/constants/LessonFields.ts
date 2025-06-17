// constants/LessonFields.ts
import type { Field } from "@/types/formTypes";

const LessonFields: Field[] = [
  {
    name: "levelSubjectId",
    label: "Level/Subject",
    placeholder: "Choose a level and a subject",
    type: "select",
    options: [], 
    validationRules: {
      required: true,
    },
  },
  {
    name: "lessonNames",
    label: "Lessons Names",
    placeholder: "Enter lesson names",
    type: "string-array",
    validationRules: {
      required: true,
      minItems: 1,
    },
  },
];

export default LessonFields;
