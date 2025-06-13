// Définition locale du type Field
export interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  validationRules?: {
    required?: boolean;
    type?: string;
    min?: number;
    max?: number;
    [key: string]: any;
  };
}

const CoefficientFields: Field[] = [
  {
    name: "assiduity_coefficient",
    label: "Assiduity Coefficient",
    type: "number",
    placeholder: "Enter assiduity coefficient",
    validationRules: {
      required: true,
      type: "number",
      min: 0
    }
  },
  {
    name: "participation_coefficient",
    label: "Participation Coefficient",
    type: "number", 
    placeholder: "Enter participation coefficient",
    validationRules: {
      required: true,
      type: "number",
      min: 0
    }
  },
  {
    name: "quiz_coefficient",
    label: "Quiz Coefficient",
    type: "number",
    placeholder: "Enter quiz coefficient", 
    validationRules: {
      required: true,
      type: "number",
      min: 0
    }
  },
  {
    name: "delay_before_attendance",
    label: "Delay Before Attendance",
    type: "number",
    placeholder: "Enter delay before attendance",
    validationRules: {
      required: true,
      type: "number",
      min: 0
    }
  }
];

export default CoefficientFields;