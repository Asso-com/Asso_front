import { useState } from "react";
import {
  VStack,
  Flex,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import type { Field } from "@/types/formTypes";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import { Form, Formik } from "formik";
import FooterActions from "@components/shared/FooterActions";
import {FiSave } from "react-icons/fi";


interface AssociationInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  associationIdentifier: string;
  logoUrl: string | File;
  currency: string;
  currencySymbol: string;
}

export const associationFormFields: Field[] = [
  {
    name: "name",
    type: "text",
    label: "Organization Name",
    placeholder: "Organization name",
    validationRules: {
      required: true,
      maxLength: 100,
    },
  },
  {
    name: "associationIdentifier",
    type: "text",
    label: "Association ID",
    placeholder: "Unique identifier",
    validationRules: {
      required: true,
      maxLength: 50,
    },
  },
  {
    name: "address",
    type: "text",
    label: "Address",
    placeholder: "Street address",
    validationRules: {
      required: true,
      maxLength: 200,
    },
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email address",
    validationRules: {
      required: true,
      email: true,
    },
  },
  {
    name: "phone",
    type: "phone",
    label: "Phone",
    placeholder: "Phone number",
    validationRules: {
      required: true,
      patterns: [
        {
          regex: /^\+?[0-9\s\-()]{7,}$/,
          message: "Invalid phone number format",
        },
      ],
    },
  },
  {
    name: "currency",
    type: "select",
    label: "Currency",
    placeholder: "Select currency",
    options: [
      { value: "USD", label: "US Dollar (USD)" },
      { value: "EUR", label: "Euro (EUR)" },
      { value: "GBP", label: "British Pound (GBP)" },
      { value: "JPY", label: "Japanese Yen (JPY)" },
    ],
    validationRules: {
      required: true,
    },
  },
  {
    name: "currencySymbol",
    type: "text",
    label: "Currency Symbol",
    placeholder: "$, €, £, etc.",
    validationRules: {
      required: true,
      maxLength: 3,
    },
  },
  {
    name: "logoUrl",
    type: "file",
    label: "Logo",
    placeholder: "Upload logo",
    validationRules: {
      required: false,
    },
  },
];

const AssociationProfile = () => {
  const [associationInfo] = useState<AssociationInfo>({
    name: "Tech Innovators Association",
    address: "123 Innovation St",
    email: "info@techinnovators.org",
    phone: "+1 (555) 987-6543",
    associationIdentifier: "ASSN12345",
    logoUrl: "https://i.pravatar.cc/150?img=1",
    currency: "USD",
    currencySymbol: "$",
  });

  const initialValues = {
    name: associationInfo.name,
    address: associationInfo.address,
    email: associationInfo.email,
    phone: associationInfo.phone,
    associationIdentifier: associationInfo.associationIdentifier,
    logoUrl: associationInfo.logoUrl,
    currency: associationInfo.currency,
    currencySymbol: associationInfo.currencySymbol,
  };

  const validationSchema = createValidationSchema(associationFormFields);

  const onSubmit = (values: Partial<AssociationInfo>) => {
    console.log(values);
  };

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      bg="white"
      borderRadius="md"
      shadow="md"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              gap: "1em",
            }}
          >
            <Flex
              direction="column"
              flex={1}
              minHeight={0}
              overflowY="auto"
              pr={2}
            >
              <Flex justify="center" align="center" mb={4}>
                <VStack spacing={4}>
                  {associationFormFields
                    .filter((field) => field.type === "file")
                    .map((field) => (
                      <RenderFormBuilder key={field.name} field={field} />
                    ))}
                </VStack>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={2}>
                {associationFormFields
                  .filter((field) => field.type !== "file")
                  .map((field) => (
                    <RenderFormBuilder key={field.name} field={field} />
                  ))}
              </SimpleGrid>
            </Flex>

            <Flex justifyContent="flex-end">
              <FooterActions
                onClose={() => {}}
                handleSave={() => {}}
                isSaving={isSubmitting}
                cancelText="Cancel"
                saveButtonProps={{
                  leftIcon: <FiSave />,
                }}
                saveText="Save Association"
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AssociationProfile;
