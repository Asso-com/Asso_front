import { useSelector } from "react-redux";
import {
  VStack,
  Flex,
  Box,
  SimpleGrid,
  Spinner
} from "@chakra-ui/react";
import type { RootState } from "@store/index";
import type { Field } from "@/types/formTypes";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import { Form, Formik } from "formik";
import FooterActions from "@components/shared/FooterActions";
import { FiSave } from "react-icons/fi";
import useFetchAssociationProfile from "./hooks/useFetchAssociationProfile";
import { useUpdateAssociationProfile } from "./hooks/useUpdateAssociationProfile";

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
    label: "Unique Identifier",
    placeholder: "Unique identifier",
    validationRules: {
      required: true,
      maxLength: 50,
    },
    inputProps:{
    isDisabled: true,
    }
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
    name: "logoUrl",
    type: "file",
    label: "Logo",
    placeholder: "Upload logo",
    validationRules: {
      required:false,
      maxSize: 2 * 1024 * 1024,
      allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    },
  },
];

const AssociationProfile = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data: associationData, isLoading} = useFetchAssociationProfile(associationId);
  const updateAssociationProfile = useUpdateAssociationProfile();
  const initialValues = {
    name: associationData?.name || "",
    address: associationData?.address || "",
    email: associationData?.email || "",
    phone: associationData?.phone || "",
    associationIdentifier: associationData?.associationIdentifier || "",
    logoUrl: associationData?.logoUrl || "", 
  };
  const validationSchema = createValidationSchema(associationFormFields);
  const onSubmit = async (values: Partial<AssociationInfo>) => {
    try {
      const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'logoUrl' && value instanceof File) {
            formData.append('image', value);
          } else if (key !== 'logoUrl') {
            formData.append(key, String(value));
          }
        }
      });

      await updateAssociationProfile.mutateAsync({
        id: associationId,
        formData
      });
    } catch (error) {
      console.error('Error updating association profile:', error);
    }
  };
  if (isLoading) {
    return (
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        bg="white"
        borderRadius="md"
        shadow="md"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }
  

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
        {({ isSubmitting, submitForm }) => (
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
                handleSave={submitForm}
                isSaving={isSubmitting || updateAssociationProfile.isPending}
                cancelText="Cancel"
                saveButtonProps={{
                  leftIcon: <FiSave />,
                }}
                saveText="Save changes"
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AssociationProfile;