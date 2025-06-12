import React, { useMemo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik, type FormikHelpers } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import type { Field } from "@/types/formTypes";
import ClassRoomFields from "../../constants/ClassRoomFields";
import FooterActions from "@components/shared/FooterActions";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index"; 
import useUpdateClassRoom from "@features/Academics/Categories-levels/hooks/useUpdateClassRoom";

interface EditClassRoomProps {
  details?: Record<string, any>;
  onClose: () => void;
  classRoomId?: number;
}

interface FormValues {
  [key: string]: any;
}

const EditClassRoom: React.FC<EditClassRoomProps> = ({
  details,
  onClose,
  classRoomId,
}) => {
  const { mutateAsync: updateClassRoom, isPending } = useUpdateClassRoom();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const initialValues: FormValues = useMemo(() => {
    const values = ClassRoomFields.reduce((acc: FormValues, field: Field) => {
      acc[field.name] = details?.[field.name] ?? "";
      return acc;
    }, {});

    return {
      ...values,
      active: details?.active ?? true, // Default to true if not provided
    };
  }, [details]);

  const validationSchema = useMemo(
    () => createValidationSchema(ClassRoomFields),
    []
  );

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      if (!classRoomId) {
        throw new Error("ClassRoom ID is missing");
      }
      if (!associationId) {
        throw new Error("Association ID is missing");
      }

      const payload = {
        name: String(values.name),
        capacity: Number(values.capacity),
        description: values.description ? String(values.description) : "",
        active: values.active ?? true,
      };

      await updateClassRoom({ classRoomId, data: payload });
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
            <SimpleGrid columns={1} spacing={2} mt={1}>
              {ClassRoomFields.map((field: Field) => (
                <RenderFormBuilder key={field.name} field={field} />
              ))}
            </SimpleGrid>
            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isDisabled={!dirty}
              isSaving={isSubmitting || isPending}
              cancelText="Cancel"
              saveText="Edit ClassRoom"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditClassRoom;