import type { GuardianType } from "../types";
import { FIELD_PREFIXES } from "./separateFormData";

// Types
type FormValues = {
  [key: string]: any;
};


interface EditData {
  studentData?: any;
  fatherData?: any;
  motherData?: any;
  tutorData?: any;
  levelId?: string | number;
}

export const determineGuardianType = (editData: EditData): GuardianType => {
  if (editData.fatherData?.isGuardian === true) return "father";
  if (editData.motherData?.isGuardian === true) return "mother";
  if (editData.tutorData?.isGuardian === true) return "other";
  return "father"; // default fallback
};

/**
 * Merges edit data with form default values
 */
const mergeEditDataWithFormValues = (editData: EditData, defaultValues: FormValues): FormValues => {
  const mergedValues = { ...defaultValues };

  // Merge student data directly
  if (editData.studentData) {
    Object.entries(editData.studentData).forEach(([key, value]) => {
      if (mergedValues.hasOwnProperty(key)) {
        mergedValues[key] = value;
      }
    });
  }

  // Merge father data with prefix
  if (editData.fatherData) {
    Object.entries(editData.fatherData).forEach(([key, value]) => {
      const prefixedKey = `${FIELD_PREFIXES.FATHER}${key}`;
      if (mergedValues.hasOwnProperty(prefixedKey)) {
        mergedValues[prefixedKey] = value;
      }
    });
  }

  // Merge mother data with prefix
  if (editData.motherData) {
    Object.entries(editData.motherData).forEach(([key, value]) => {
      const prefixedKey = `${FIELD_PREFIXES.MOTHER}${key}`;
      if (mergedValues.hasOwnProperty(prefixedKey)) {
        mergedValues[prefixedKey] = value;
      }
    });
  }

  // Merge tutor data with prefix
  if (editData.tutorData) {
    Object.entries(editData.tutorData).forEach(([key, value]) => {
      const prefixedKey = `${FIELD_PREFIXES.TUTOR}${key}`;
      if (mergedValues.hasOwnProperty(prefixedKey)) {
        mergedValues[prefixedKey] = value;
      }
    });
  }

  // Set level ID if provided
  if (editData.levelId) {
    mergedValues.levelId = editData.levelId;
  }

  return mergedValues;
};
export default mergeEditDataWithFormValues;