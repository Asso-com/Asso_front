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
import useUpdateClassRoom from "@features/Academics/Class-room/hooks/useUpdateClassRoom";

interface EditClassRoomProps {
  details?: Record<string, any>;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditClassRoom: React.FC<EditClassRoomProps> = ({ details, onClose }) => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const { mutateAsync: updateClassRoom, isPending } =
    useUpdateClassRoom(associationId);

  const initialValues: FormValues = useMemo(() => {
    return ClassRoomFields.reduce((acc: FormValues, field: Field) => {
      acc[field.name] = details?.[field.name] ?? "";
      return acc;
    }, {});
  }, [details]);

  const validationSchema = createValidationSchema(ClassRoomFields);

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const classRoomId = details?.id;
      await updateClassRoom({ classRoomId, data: values });
      onClose();
    } catch (error) {
    } finally {
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
            <SimpleGrid columns={2} spacing={4} mt={2}>
              {ClassRoomFields.filter((field) => field.name !== "active").map(
                (field: Field) => (
                  <RenderFormBuilder key={field.name} field={field} />
                )
              )}
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
