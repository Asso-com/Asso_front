import { useMemo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import AnnonceFields from "../constants/AnnonceFields";
import FooterActions from "@components/shared/FooterActions";
import useUpdateAnnonce from "../../hooks/useUpdateAnnonce";
import { useSelector } from "react-redux";

interface EditAnnonceProps {
  details?: any;
  onClose: () => void;
}

interface FormValues {
  [key: string]: any;
}

const EditAnnonce = ({ details, onClose }: EditAnnonceProps) => {
  const associationId = useSelector((state: any) => state.authSlice.associationId);
  const { mutateAsync: updateAnnonce } = useUpdateAnnonce(associationId);

  const initialValues: FormValues = useMemo(() => {
    return AnnonceFields.reduce((acc: FormValues, field: any) => {
      acc[field.name] = details?.[field.name]?.toString() || "";
      return acc;
    }, {});
  }, [details]);

  const validationSchema = useMemo(
    () => createValidationSchema(AnnonceFields as any),
    []
  );

  const onSubmit = async (values: FormValues, actions: any) => {
    try {
      if (details?.id) {
        await updateAnnonce({ 
          annonceId: details.id, 
          data: values 
        });
      }
      actions.setSubmitting(false);
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      actions.setSubmitting(false);
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
              {AnnonceFields.map((field: any) => (
                <RenderFormBuilder key={field.name} field={field as any} />
              ))}
            </SimpleGrid>
            <Box mt={4}>
              <FooterActions
                onClose={onClose}
                handleSave={handleSubmit}
                isDisabled={!dirty}
                isSaving={isSubmitting}
                cancelText="Cancel"
                saveText="Update Annonce"
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditAnnonce;