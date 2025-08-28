import { VStack, Flex, Box, SimpleGrid } from "@chakra-ui/react";
import type { Field } from "@/types/formTypes";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import createValidationSchema from "@utils/createValidationSchema";
import { Form, Formik } from "formik";
import FooterActions from "@components/shared/FooterActions";
import useFetchUserProfile from "./hooks/useFetchUserProfile";
import { useUpdateUserProfile } from "./hooks/useUpdateUserProfile";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  comment: string;
  image: File | string |null;
  mobileNumber?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  state?: string;
  imageUrl?: string | File;
}

export const userFormFields: Field[] = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    placeholder: "First name",
    validationRules: {
      required: true,
      maxLength: 100,
    },
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    placeholder: "Last name",
    validationRules: {
      required: true,
      maxLength: 100,
    },
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Email address",
    validationRules: {
      required: true,
      email: true,
      minLength: 3,
      maxLength: 100,
    },
  },
  {
    name: "mobileNumber",
    type: "phone",
    label: "Phone Number",
    placeholder: "Phone number",
    validationRules: {
      required: false,
      patterns: [
        {
          regex: /^\+?[0-9\s\-()]{7,}$/,
          message: "Invalid phone number format",
        },
      ],
    },
  },
  {
    name: "image",
    type: "file",
    label: "Image",
    placeholder: "Upload Image",
    validationRules: {
      maxSize: 2 * 1024 * 1024,
      allowedExtensions: ["jpg", "jpeg", "png", "webp"],
    },
  },
  {
    name: "address",
    type: "text",
    label: "Street Address",
    placeholder: "123 Main St",
    validationRules: {
      required: false,
      maxLength: 100,
    },
  },
  {
    name: "city",
    type: "text",
    label: "City",
    placeholder: "City",
    validationRules: {
      required: false,
      maxLength: 50,
    },
  },
  {
    name: "zipCode",
    type: "text",
    label: "ZIP/Postal Code",
    placeholder: "10001",
    validationRules: {
      required: false,
      patterns: [
        {
          regex: /^[0-9]{5}(?:-[0-9]{4})?$/,
          message: "Invalid ZIP code format",
        },
      ],
    },
  },
  {
    name: "comment",
    type: "textarea",
    label: "Bio",
    placeholder: "Tell us about yourself...",
    validationRules: {
      required: false,
      maxLength: 200,
    },
  },
];

const UserProfile = () => {
  const { data: userInfo, isLoading } = useFetchUserProfile();
  const { mutate: updateProfile, isPending: isUpdating } =
    useUpdateUserProfile();

  const initialValues = {
    firstName: userInfo?.firstName ?? "",
    lastName: userInfo?.lastName ?? "",
    email: userInfo?.email ?? "",
    phone: userInfo?.mobileNumber ?? "",
    mobileNumber: userInfo?.mobileNumber ?? "",
    comment: userInfo?.comment ?? "",
    image: userInfo?.imageUrl ?? "",
    address: userInfo?.address ?? "",
    city: userInfo?.city ?? "",
    zipCode: userInfo?.zipCode ?? "",
  };

  if (isLoading) return <p>Chargement du profil...</p>;

  const validationSchema = createValidationSchema(userFormFields);

  const createFormData = (values: Partial<UserInfo>): FormData => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (key === "image") {
          if (value instanceof File) {
            formData.append("image", value);
          }
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return formData;
  };

  const onSubmit = (values: Partial<UserInfo>) => {
    const formData = createFormData(values);
    updateProfile({ formData });
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
        {({ dirty }) => (
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
                  {userFormFields
                    .filter((field) => field.type === "file")
                    .map((field) => (
                      <RenderFormBuilder key={field.name} field={field} />
                    ))}
                </VStack>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={2}>
                {userFormFields
                  .filter(
                    (field) => field.type !== "file" && field.name !== "comment"
                  )
                  .map((field) => (
                    <RenderFormBuilder key={field.name} field={field} />
                  ))}
              </SimpleGrid>

              <SimpleGrid columns={1} spacing={2}>
                {userFormFields
                  .filter((field) => field.name === "comment")
                  .map((field) => (
                    <RenderFormBuilder key={field.name} field={field} />
                  ))}
              </SimpleGrid>
            </Flex>

            <Flex justifyContent="flex-end">
              <Flex justifyContent="flex-end">
              <FooterActions
                onClose={() => {}}
                handleSave={() => {}}
                isDisabled={!dirty}
                isSaving={isUpdating}
                cancelText="Cancel"
                saveText="Save Changes"
              />
            </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UserProfile;