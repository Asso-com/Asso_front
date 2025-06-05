import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { Flex } from "@chakra-ui/react";
import { Formik, type FormikProps } from "formik";
import { useSelector } from "react-redux";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";
import SubjectFields from "../../constants/SubjectFields";
import type { RootState } from "@store/index";
import useFetchDepartementByAssociation from "@features/Academics/department/hooks/useFetchDepartementByAssociation";

type FormValues = {
  [key: string]: any;
};

export type FormContentRef = {
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => void;
};

const FormContent = forwardRef<FormContentRef>((_, ref) => {
  const [initialValues, setInitialValues] = useState<FormValues>({});
  const [formFields, setFormFields] = useState<Field[]>(SubjectFields);
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { data: departments } = useFetchDepartementByAssociation(associationId);

  // Helper to map data into options
  const mapOptions = (data: any[], valueKey: string, labelKey: string) =>
    data?.map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
    })) || [];

  const departmentsOptions = useMemo(
    () => mapOptions(departments, "id", "name"),
    [departments]
  );

  // Update departmentId field options when department data is fetched
  useEffect(() => {
    setFormFields((prevFields: Field[]) =>
      prevFields.map((field) =>
        field.name === "departmentId"
          ? { ...field, options: departmentsOptions }
          : field
      )
    );
  }, [departmentsOptions]);

  // Initialize default form values
  useEffect(() => {
    const defaultValues = SubjectFields.reduce(
      (acc: FormValues, field: Field) => {
        acc[field.name] = "";
        return acc;
      },
      {}
    );
    setInitialValues({
      ...defaultValues,
      active: true,
    });
  }, []);

  // Validation schema based on current fields
  const validationSchema = useMemo(
    () => createValidationSchema(formFields),
    [formFields]
  );

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current) return null;

      try {
        await formikRef.current.submitForm();
        if (formikRef.current.isValid) {
          return {
            ...formikRef.current.values,
          };
        }
      } catch (error) {
        console.error("Form submission failed:", error);
      }

      return null;
    },
    resetForm: () => {
      if (formikRef.current) {
        formikRef.current.resetForm({
          values: initialValues,
        });
      }
    },
  }));

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={() => {}}
    >
      <Flex direction="column" gap={4}>
        {formFields.map((field: Field) => (
          <RenderFormBuilder key={field.name} field={field} />
        ))}
      </Flex>
    </Formik>
  );
});

export default FormContent;
