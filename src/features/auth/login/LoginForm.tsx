import {
  Alert,
  AlertIcon,
  Button,
  Collapse,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form, type FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { FiLogIn } from "react-icons/fi";
import { useState } from "react";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import loginFormFields from "@features/auth/constants/loginFormFields";
import { useAuth } from "@hooks/useAuth";

import type { Field as FieldType } from "@/types/formTypes";
import type { LoginRequest } from "@/types/authTypes";

type FormValues = Record<string, string>;

interface LoginFormProps {
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const { t } = useTranslation();
  const { loginProvider } = useAuth();
  const [error, setError] = useState<string | null>(null);

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
    setError(null); // Clear any existing errors

    try {
      const request: LoginRequest = {
        email: values.email,
        password: values.password,
      };
      await loginProvider(request);
    } catch (error: any) {
      setError(error?.message || t("An unexpected error occurred."));
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

          <VStack>
            <Button
              mt={4}
              mb={2}
              type="submit"
              width="100%"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
              rightIcon={<FiLogIn />}
              bg="brand.500"
              color="white"
              _hover={{
                bg: "brand.600",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              _active={{
                bg: "brand.700",
                transform: "translateY(0px)",
              }}
            >
              {t("Sign In")}
            </Button>

            <Collapse in={!!error} animateOpacity>
              <Alert status="error" borderRadius={"lg"} fontSize={"sm"}>
                <AlertIcon />
                {error}
              </Alert>
            </Collapse>

            <Text
              color="gray.600"
              cursor="pointer"
              _hover={{ color: "brand.500", textDecoration: "underline" }}
              onClick={onForgotPassword}
              transition="all 0.2s"
            >
              {t("Forgot your password?")}
            </Text>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
