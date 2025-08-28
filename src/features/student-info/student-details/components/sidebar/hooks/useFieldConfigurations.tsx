import type { Field } from "@/types/formTypes";
import {
  fatherFields,
  guardianFields,
  levelFields,
  motherFields,
  studentFields,
} from "@features/student-info/student-details/constants/StudentFields";
import { FIELD_PREFIXES } from "@features/student-info/student-details/utils/separateFormData";
import { useMemo } from "react";

const prefixFields = (fields: Field[], prefix: string): Field[] =>
  fields.map((field) => ({
    ...field,
    name: `${prefix}${field.name}`,
  }));

const useFieldConfigurations = (
  showTutorFields: boolean,
  isEditMode: boolean
) => {
  return useMemo(() => {
    const prefixedFatherFields = prefixFields(
      fatherFields,
      FIELD_PREFIXES.FATHER
    );
    const prefixedMotherFields = prefixFields(
      motherFields,
      FIELD_PREFIXES.MOTHER
    );
    const prefixedTutorFields = prefixFields(
      guardianFields,
      FIELD_PREFIXES.TUTOR
    );

    // Filter out levelFields in edit mode
    const fieldsToInclude = isEditMode ? [] : levelFields;

    const allFields = [
      ...studentFields,
      ...prefixedFatherFields,
      ...prefixedMotherFields,
      ...(showTutorFields ? prefixedTutorFields : []),
      ...fieldsToInclude,
    ];

    return {
      allFields,
      prefixedFatherFields,
      prefixedMotherFields,
      prefixedTutorFields,
    };
  }, [showTutorFields, isEditMode]);
};

export default useFieldConfigurations;
