// constants/LessonFields.ts
import type { Field } from "@/types/formTypes";

const LessonFields: Field[] = [
  {
    name: "levelSubjectId",
    label: "Niveau/Matière",
    placeholder: "Choisir un niveau et une matière",
    type: "select",
    options: [], // sera rempli dynamiquement
    validationRules: {
      required: true,
    },
  },
  {
    name: "lessonNames",
    label: "Noms des leçons",
    placeholder: "Saisir les noms des leçons",
    type: "string-array",
    validationRules: {
      required: true,
      minItems: 1,
    },
  },
];

export default LessonFields;
