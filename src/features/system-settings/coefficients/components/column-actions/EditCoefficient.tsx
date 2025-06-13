import React from "react";
import { Box } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import FooterActions from "@components/shared/FooterActions";
import CoefficientServiceApi from "../../services/CoefficientServiceApi";
import type { RootState } from "@store/index";
import type { CoefficientType } from "../../types";

interface EditCoefficientProps {
  details: CoefficientType;
  onClose: () => void;
}

const EditCoefficient: React.FC<EditCoefficientProps> = ({ details, onClose }) => {
  const { t } = useTranslation();
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  const queryClient = useQueryClient();
  const toast = useToast();

  // Assurez-vous que les valeurs initiales sont correctement définies
  const initialValues = {
    assiduity_coefficient: details?.assiduity_coefficient?.toString() || "0",
    delay_before_attendance: details?.delay_before_attendance?.toString() || "0",
    participation_coefficient: details?.participation_coefficient?.toString() || "0",
    quiz_coefficient: details?.quiz_coefficient?.toString() || "0"
  };

  console.log("Initial values for editing:", initialValues);
  console.log("Original details:", details);

  const validationSchema = Yup.object({
    assiduity_coefficient: Yup.number()
      .typeError(t("Must be a number"))
      .required(t("Required field"))
      .min(0, t("Must be positive")),
    delay_before_attendance: Yup.number()
      .typeError(t("Must be a number"))
      .required(t("Required field"))
      .min(0, t("Must be positive")),
    participation_coefficient: Yup.number()
      .typeError(t("Must be a number"))
      .required(t("Required field"))
      .min(0, t("Must be positive")),
    quiz_coefficient: Yup.number()
      .typeError(t("Must be a number"))
      .required(t("Required field"))
      .min(0, t("Must be positive"))
  });

  // Corriger la mutation pour s'assurer que les données sont correctement formatées
  const { mutate: updateCoefficient, isPending } = useMutation({
    mutationFn: (values: any) => {
      console.log("Form values submitted:", values);
      
      // Assurez-vous que toutes les valeurs sont converties en nombres correctement
      const apiData = {
        assiduityCoefficient: Number(values.assiduity_coefficient),
        delayBeforeAttendance: Number(values.delay_before_attendance),
        participationCoefficient: Number(values.participation_coefficient),
        quizCoefficient: Number(values.quiz_coefficient),
        // Assurez-vous que ces valeurs sont disponibles si nécessaire
        associationId: details.association_id
      };
      
      console.log("Data being sent to API:", apiData);
      
      // Vérifiez que l'ID est défini
      if (!details.id) {
        throw new Error("ID is missing, cannot update");
      }
      
      return CoefficientServiceApi.update(details.id, apiData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coefficients', associationId] });
      toast({
        title: t('Updated'),
        description: t('Coefficient settings updated successfully'),
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    },
    onError: (error: any) => {
      console.error("Error updating coefficient:", error);
      toast({
        title: t('Error'),
        description: error.message || t('Failed to update coefficient settings'),
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  });

  return (
    <Box p={4}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
          updateCoefficient(values);
        }}
      >
        {({ isSubmitting, handleSubmit, dirty, isValid }) => (
          <Form>
            <RenderFormBuilder 
              field={{
                name: "assiduity_coefficient",
                label: t("Assiduity Coefficient"),
                type: "number",
                placeholder: t("Enter assiduity coefficient"),
              }} 
            />
            <RenderFormBuilder 
              field={{
                name: "participation_coefficient",
                label: t("Participation Coefficient"),
                type: "number",
                placeholder: t("Enter participation coefficient"),
              }} 
            />
            <RenderFormBuilder 
              field={{
                name: "quiz_coefficient",
                label: t("Quiz Coefficient"),
                type: "number",
                placeholder: t("Enter quiz coefficient"),
              }} 
            />
            <RenderFormBuilder 
              field={{
                name: "delay_before_attendance",
                label: t("Delay Before Attendance"),
                type: "number",
                placeholder: t("Enter delay before attendance"),
              }} 
            />
              <Box mt={6}>
            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isDisabled={!dirty || !isValid}
              isSaving={isPending || isSubmitting}
              cancelText={t("Cancel")}
              saveText={t("Update Coefficient")}
            />
              </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditCoefficient;