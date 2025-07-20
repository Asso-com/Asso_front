import React from "react";
import { VStack, Stack, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import sendEmailFields from "../constants/sendEmailFields";
import AuthButton from "../Button";
import { useTranslation } from "react-i18next";

type FormValues = {
  email: string;
};

interface EmailStepProps {
  isLoading: boolean;
  handleEmailSubmit: any;
}

const EmailStep: React.FC<EmailStepProps> = ({
  isLoading,
  handleEmailSubmit,
}) => {
  const { t } = useTranslation();
  const initialValues: FormValues = {
    email: "",
  };

  const validationSchema = createValidationSchema(sendEmailFields);

  return (
    <VStack spacing={2} textAlign="center">
      <Text fontSize="sm" color="gray.600">
        {t(
          "Enter your email address and we'll send you a verification code to reset your password"
        )}
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleEmailSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: "100%" }}>
            <Stack spacing={4}>
              {sendEmailFields.map((field, index) => (
                <RenderFormBuilder
                  key={field.name}
                  field={field}
                  index={index}
                  labelDirection="top"
                />
              ))}
            </Stack>

            <AuthButton
              type="submit"
              width="100%"
              isLoading={isLoading || isSubmitting}
              loadingText={t("Sending")} // "Sending..."
              bg="brand.500"
              color="white"
              title="Send Verification Code"
            />
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default EmailStep;
