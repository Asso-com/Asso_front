import React from "react";
import { VStack, Stack, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import passwordFields from "../constants/passwordFields";
import AuthButton from "../Button";
import { useTranslation } from "react-i18next";

type FormValues = {
  newPassword: string;
  confirmPassword: string;
};

interface PasswordResetStepProps {
  isLoading: boolean;
  handlePasswordReset: any;
}

const PasswordResetStep: React.FC<PasswordResetStepProps> = ({
  isLoading,
  handlePasswordReset,
}) => {
  const { t } = useTranslation();
  const initialValues: FormValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = createValidationSchema(passwordFields);

  return (
    <VStack spacing={2} w={"100%"}>
      <Text fontSize="sm" color="gray.600">
        {t("Identity verified! Now create your new password")}
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handlePasswordReset}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: "100%" }}>
            <Stack spacing={4}>
              {passwordFields.map((field, index) => (
                <RenderFormBuilder
                  key={field.name}
                  field={field}
                  index={index}
                  labelDirection="top"
                />
              ))}
            </Stack>
            <AuthButton
              width="100%"
              isLoading={isLoading || isSubmitting}
              loadingText={t("Updating Password") + "..."}
              bg="brand.500"
              color="white"
              title="Reset Password"
            />
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default PasswordResetStep;
