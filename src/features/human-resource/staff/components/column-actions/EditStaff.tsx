

import React, { useMemo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik, type FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { showToast } from "@store/toastSlice";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";
import StaffFields from "../../constants/StaffFields";
import FooterActions from "@components/shared/FooterActions";
import useUpdateStaff from "../../hooks/useUpdateStaff";

interface EditStaffProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditStaff: React.FC<EditStaffProps> = ({ details, onClose }) => {
  const dispatch = useDispatch();
  const { mutateAsync: updateStaff } = useUpdateStaff();

  const initialValues: FormValues = useMemo(() => {
    const values = StaffFields.reduce((acc: FormValues, field: Field) => {
      acc[field.name] = details?.[field.name] ?? "";
      return acc;
    }, {});

    return {
      ...values, 
    };
  }, [details]);

  const validationSchema = useMemo(() => createValidationSchema(StaffFields), []);

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await updateStaff({
        staffId: details?.id,
        data: {
          ...values,
          isActive: values.isActive ?? true,  
        },
      });
      dispatch(
        showToast({
          title: "Succès",
          message: "Le membre du personnel a été mis à jour avec succès",
          type: "success",
        })
      );
      setSubmitting(false);
      onClose();
    } catch (error) {
      setSubmitting(false); 
    }
  };

  return (
    <Box p={4}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleSubmit, dirty }) => (
          <Form>
            <SimpleGrid columns={2} spacing={2} mt={2}>
              {StaffFields.map((field: Field) => (
                <RenderFormBuilder key={field.name} field={field} />
              ))}
            </SimpleGrid>
            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isDisabled={!dirty}
              isSaving={isSubmitting}
              cancelText="Cancel"
              saveText="Edit staff"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditStaff;