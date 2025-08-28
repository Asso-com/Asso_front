// useFamilyReunionForm.ts
import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

// adjust import path
import { getDefaultFormValues } from "@utils/getDefaultValueByType";

import type { RootState } from "@store/index";
import { ReunionFields, validationSchema } from "../constants/ReunionFields";
import type { FormikProps } from "formik";

import { axiosInstance } from "@services/api-services/axiosInstance";

export function formatDateTimeForBackend(dateStr: string): string {
  if (!dateStr) return dateStr;
  const [datePart, timePart] = dateStr.split("T");
  const [year, month, day] = datePart.split("-");
  const [hour, minute] = timePart.split(":");

  return `${day}/${month}/${year} ${hour}:${minute}`;
}

type FormValues = {
  [key: string]: any;
};

export function useFamilyReunionForm() {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const defaultValues = {
    ...getDefaultFormValues(ReunionFields),
    familyIds: [],
    associationId: associationId || 0,
  };

  const [initialValues] = useState<FormValues>(defaultValues);
  const [familiesOptions, setFamiliesOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [isAllFamilies, setIsAllFamilies] = useState(false);

  const formikRef = useRef<FormikProps<FormValues>>(null);

  // Fetch families options
  useEffect(() => {
    if (!associationId) return;

    const fetchFamilies = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/families", {
          params: { associationId },
        });

        const options = res.data.map((family: any) => {
          const father = family.father
            ? `${family.father.lastName.toUpperCase()} ${
                family.father.firstName
              }`
            : "-";
          const mother = family.mother
            ? `${family.mother.lastName.toUpperCase()} ${
                family.mother.firstName
              }`
            : "-";
          return {
            label: `${father} & ${mother}`,
            value: family.id,
          };
        });

        setFamiliesOptions(options);
      } catch (error) {
        console.error("Error fetching families", error);
      }
    };

    fetchFamilies();
  }, [associationId]);

  const fieldsWithOptions = useMemo(() => {
    return ReunionFields.map((field) =>
      field.name === "familyIds"
        ? { ...field, options: familiesOptions }
        : field
    );
  }, [familiesOptions]);

  const submitForm = async (): Promise<FormValues | null> => {
    if (!formikRef.current) return null;
    await formikRef.current.submitForm();

    if (formikRef.current.isValid) {
      const values = { ...formikRef.current.values };
      values.associationId = associationId;

      if (isAllFamilies) {
        values.familyIds = [];
      }

      if (values.date) {
        values.date = formatDateTimeForBackend(values.date);
      }

      return values;
    }
    console.warn("Validation errors:", formikRef.current.errors);
    return null;
  };

  const resetForm = () => {
    if (formikRef.current) {
      formikRef.current.resetForm({ values: initialValues });
      setIsAllFamilies(false);
    }
  };

  return {
    initialValues,
    fieldsWithOptions,
    validationSchema: validationSchema(isAllFamilies),
    isAllFamilies,
    setIsAllFamilies,
    formikRef,
    submitForm,
    resetForm,
  };
}
