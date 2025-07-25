import { forwardRef, useRef, useImperativeHandle, useMemo } from "react";
import { Flex } from "@chakra-ui/react";
import { Formik, type FormikProps } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import BookFormFields from "../../constant/BookFields";
import type { BookRequest } from "../../types";

export type FormContentRef = {
  submitForm: () => Promise<BookRequest | null>;
  resetForm: () => void;
  isDirty: () => boolean;
};

interface FormContentProps {
  editData?: BookRequest;
  isEditMode?: boolean;
}

export const FormContent = forwardRef<FormContentRef, FormContentProps>(
  ({ editData, isEditMode = false }, ref) => {
    const formikRef = useRef<FormikProps<BookRequest>>(null);
    const associationId = useSelector(
      (state: RootState) => state.authSlice.associationId
    );

    const defaultValues: BookRequest = {
      bookTitle: "",
      bookNo: "",
      isbnNo: "",
      subject: "",
      rackNo: "",
      publish: "",
      author: "",
      qty: 1,
      perUnitCost: 0,
      postDate: new Date().toISOString().split("T")[0],
      description: "",
      available: true,
      isActive: true,
      associationId: associationId || 0,
    };

    const initialValues: BookRequest = useMemo(() => {
      if (isEditMode && editData) {
        return {
          ...defaultValues,
          ...editData,
          associationId: editData.associationId || associationId,
          rackNo: editData.rackNo || "",
          publish: editData.publish || "",
        };
      }
      return defaultValues;
    }, [isEditMode, editData, associationId]);

    const validationSchema = useMemo(() => {
      return createValidationSchema(BookFormFields);
    }, []);

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        if (!formikRef.current) return null;

        await formikRef.current.submitForm();
        const { isValid, values, errors } = formikRef.current;

        if (!isValid || Object.keys(errors).length > 0) {
          console.error("Form validation errors:", errors);
          return null;
        }

        return {
          ...values,
          associationId,
          rackNo: values.rackNo || undefined,
          publish: values.publish || undefined,
        };
      },

      resetForm: () => {
        if (formikRef.current) {
          formikRef.current.resetForm({ values: initialValues });
        }
      },

      isDirty: () => {
        return !!formikRef.current?.dirty;
      },
    }));

    return (
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={() => {}}
      >
        {() => (
          <Flex direction="column" gap={4}>
            {BookFormFields.filter((field) => {
              if (
                !isEditMode &&
                (field.name === "available" || field.name === "isActive")
              ) {
                return false;
              }
              return true;
            }).map((field) => (
              <RenderFormBuilder key={field.name} field={field} />
            ))}
          </Flex>
        )}
      </Formik>
    );
  }
);
