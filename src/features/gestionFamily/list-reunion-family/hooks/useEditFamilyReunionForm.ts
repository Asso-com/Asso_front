// hooks/useEditFamilyReunionForm.ts
import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import type { FormikProps } from "formik";
import { getDefaultFormValues } from "@utils/getDefaultValueByType";
import { ReunionFields, validationSchema } from "../constants/ReunionFields";
import { axiosInstance } from "@services/api-services/axiosInstance";

type FormValues = {
  [key: string]: any;
};

export function useEditFamilyReunionForm(details: Record<string, any>) {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const [familiesOptions, setFamiliesOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [isAllFamilies, setIsAllFamilies] = useState(false);

  const formikRef = useRef<FormikProps<FormValues>>(null);

  const initialValues = useMemo(() => {
    const values = { ...getDefaultFormValues(ReunionFields) };

    ReunionFields.forEach((field) => {
      values[field.name] = details?.[field.name] ?? values[field.name];
    });

    values.associationId = associationId || 0;
    return values;
  }, [details, associationId]);

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

  return {
    initialValues,
    fieldsWithOptions,
    validationSchema: validationSchema(isAllFamilies),
    isAllFamilies,
    setIsAllFamilies,
    formikRef,
  };
}
