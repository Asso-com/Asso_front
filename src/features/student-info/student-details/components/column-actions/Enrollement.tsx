import { Box, Flex, Text, Divider, VStack, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import FooterActions from "@components/shared/FooterActions";
import createValidationSchema from "@utils/createValidationSchema";
import useFetchLevelsByCategory from "@features/Academics/list-level/hooks/useFetchLevelsByCategory";

import { levelFields } from "../../constants/StudentFields";
import type { RootState } from "@/store";
import type { Field } from "@/types/formTypes";
import type { StudentDetails } from "../../types";
import useEnrollementAcademic from "../../hooks/useEnrollementAcademic";

interface EnrollementProps {
  studentDetails: StudentDetails | undefined;
  onClose: () => void;
}

const Enrollement: React.FC<EnrollementProps> = ({
  studentDetails,
  onClose,
}) => {
  const { t } = useTranslation();
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { mutateAsync } = useEnrollementAcademic(associationId);
  const [formFields, setFormFields] = useState<Field[]>([]);

  const { data: levels } = useFetchLevelsByCategory(associationId, 1);

  const levelOptions = useMemo(
    () =>
      levels?.map((lvl: any) => ({
        label: `${lvl.name} (${lvl.code})`,
        value: lvl.id,
      })) || [],
    [levels]
  );

  useEffect(() => {
    const updatedFields = levelFields.map((field) =>
      field.name === "levelId" ? { ...field, options: levelOptions } : field
    );
    setFormFields(updatedFields);
  }, [levelOptions]);

  const validationSchema = useMemo(
    () => createValidationSchema(formFields),
    [formFields]
  );

  return (
    <Flex direction="column" gap={2}>
      <Box
        bg="white"
        borderRadius="xl"
        p={4}
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        border="1px solid"
        borderColor="gray.100"
      >
        <VStack spacing={4} align="stretch">
          <HStack spacing={4} align="center">
            <VStack align="start" spacing={1} flex={1}>
              <Text fontSize="xl" fontWeight="bold" color="gray.800">
                {studentDetails?.firstName} {studentDetails?.lastName}
              </Text>
            </VStack>
          </HStack>

          <Divider />

          <VStack spacing={2} align="stretch">
            <Box bg="gray.50" borderRadius="md" p={4}>
              <VStack spacing={3} align="stretch">
                <HStack justify="space-between" align="center">
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    {t("Registration ID")}:
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.800"
                    textAlign="right"
                  >
                    {studentDetails?.registrationId}
                  </Text>
                </HStack>

                <Divider />

                <HStack justify="space-between" align="center">
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    fontWeight="medium"
                    minW="140px"
                  >
                    {t("Email Address")}:
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color="blue.600"
                    textAlign="right"
                  >
                    {studentDetails?.email}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </VStack>
      </Box>

      <Formik
        initialValues={{ levelId: "" }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values) => {
          if (!studentDetails?.id) return;

          try {
            await mutateAsync({
              studentId: studentDetails.id,
              levelId: values.levelId, // convert to number
            });
            onClose();
          } catch (error) {
            console.error("Enrollment failed:", error);
          }
        }}
      >
        {({ handleSubmit, dirty, isSubmitting }) => (
          <Form>
            <VStack spacing={6} align="stretch">
              <Box bg="gray.50" borderRadius="md" p={4}>
                <VStack spacing={4} align="stretch">
                  {formFields.map((field: Field) => (
                    <RenderFormBuilder key={field.name} field={field} />
                  ))}
                </VStack>
              </Box>

              <FooterActions
                onClose={onClose}
                handleSave={handleSubmit}
                isDisabled={!dirty}
                isSaving={isSubmitting}
                cancelText={t("Cancel")}
                saveText={t("Enroll")}
              />
            </VStack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default Enrollement;
