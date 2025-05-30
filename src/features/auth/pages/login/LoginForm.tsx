import { Box, Button, Stack } from "@chakra-ui/react";
import { Formik, Form, type FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { FiLogIn } from "react-icons/fi";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from '@utils/createValidationSchema';
import loginFormFields from "@features/auth/constants/loginFormFields";
import { useAuth } from "@hooks/useAuth";

import type { Field as FieldType } from "@/types/formTypes";
import type { LoginRequest } from "@/types/authTypes";

type FormValues = Record<string, string>;

const LoginForm = () => {
  const { t } = useTranslation();
  const { loginProvider } = useAuth();

  const initialValues: FormValues = loginFormFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {} as FormValues);

  const validationSchema = createValidationSchema(loginFormFields);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true);
    try {
      const request: LoginRequest = {
        email: values.email,
        password: values.password,
      };
      await loginProvider(request);
    } catch (error) {
      // optionally handle error
      console.error("Login failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing={4}>
            {loginFormFields.map((field: FieldType, index) => (
              <RenderFormBuilder
                key={field.name}
                field={field}
                index={index}
                labelDirection="top"
              />
            ))}
          </Stack>

          <Box display="flex" justifyContent="flex-end">
            <Button
              colorScheme="secondary"
              mt={4}
              mb={2}
              type="submit"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
              rightIcon={<FiLogIn />}
            >
              {t("Log In")}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
