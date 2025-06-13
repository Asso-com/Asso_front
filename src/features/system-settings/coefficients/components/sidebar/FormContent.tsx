import  { forwardRef, useRef, useEffect, useImperativeHandle, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";

// Ne pas exporter ce type pour éviter les importations circulaires
interface FormContentRef {
  submitForm: () => Promise<any | null>;
  resetForm: () => void;
}

interface FormContentProps {
  initialData?: any;
}

const FormContent = forwardRef<FormContentRef, FormContentProps>(({ initialData }, ref) => {
  const { t } = useTranslation();
  const formikRef = useRef<any>(null);
  const [initialValues, setInitialValues] = useState({
    assiduity_coefficient: "",
    delay_before_attendance: "",
    participation_coefficient: "",
    quiz_coefficient: ""
  });
  
  // Mettre à jour les valeurs initiales quand initialData change
  useEffect(() => {
    if (initialData) {
      console.log("Setting form values with:", initialData);
      setInitialValues({
        assiduity_coefficient: initialData.assiduity_coefficient?.toString() || "",
        delay_before_attendance: initialData.delay_before_attendance?.toString() || "",
        participation_coefficient: initialData.participation_coefficient?.toString() || "",
        quiz_coefficient: initialData.quiz_coefficient?.toString() || ""
      });
    }
  }, [initialData]);

  // Exposer les méthodes du formulaire via ref
  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (!formikRef.current) return null;
      
      try {
        await formikRef.current.submitForm();
        const { isValid, values } = formikRef.current;
        
        if (isValid) {
          console.log("Form is valid, values:", values);
          return {
            ...values,
            // Assurez-vous que les valeurs sont des nombres
            assiduity_coefficient: parseFloat(values.assiduity_coefficient),
            delay_before_attendance: parseFloat(values.delay_before_attendance),
            participation_coefficient: parseFloat(values.participation_coefficient),
            quiz_coefficient: parseFloat(values.quiz_coefficient)
          };
        }
        return null;
      } catch (error) {
        console.error("Error submitting form:", error);
        return null;
      }
    },
    resetForm: () => {
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
    }
  }));

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

  const fields = [
    {
      name: "assiduity_coefficient",
      label: t("Assiduity Coefficient"),
      type: "number",
      placeholder: t("Enter assiduity coefficient"),
    },
    {
      name: "delay_before_attendance",
      label: t("Delay Before Attendance"),
      type: "number",
      placeholder: t("Enter delay before attendance"),
    },
    {
      name: "participation_coefficient",
      label: t("Participation Coefficient"),
      type: "number",
      placeholder: t("Enter participation coefficient"),
    },
    {
      name: "quiz_coefficient",
      label: t("Quiz Coefficient"),
      type: "number",
      placeholder: t("Enter quiz coefficient"),
    }
  ];

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(values) => {
        console.log("Form submitted with values:", values);
        // La soumission est gérée par la méthode submitForm exposée
      }}
    >
      <Flex direction="column" gap={4}>
        {fields.map((field) => (
          <RenderFormBuilder key={field.name} field={field} />
        ))}
      </Flex>
    </Formik>
  );
});

FormContent.displayName = "FormContent";

export default FormContent;