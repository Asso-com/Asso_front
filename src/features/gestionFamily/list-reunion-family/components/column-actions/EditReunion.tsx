import React, { useEffect, useMemo, useState } from "react";
import { Box, Checkbox, Flex, Input, VStack, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import FooterActions from "@components/shared/FooterActions";
import { ReunionFields, validationSchema } from "../../constants/ReunionFields";
import ReunionServiceApi from "../../services/ReunionServiceApi";
import { useUpdateReunion } from "../../hooks/useUpdateReunion";
import type { RootState } from "@store/index";

interface EditReunionProps {
  details?: Record<string, any>;
  onClose: () => void;
}

// Convert "dd/MM/yyyy HH:mm" to "yyyy-MM-ddTHH:mm"
function convertDateForInput(dateStr: string): string {
  if (!dateStr) return "";
  const [datePart, timePart] = dateStr.split(" ");
  const [day, month, year] = datePart.split("/");
  const [hour, minute] = timePart.split(":");
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

// Convert "yyyy-MM-ddTHH:mm" to "dd/MM/yyyy HH:mm"
function formatDateForBackend(dateStr: string): string {
  if (!dateStr) return "";
  const [datePart, timePart] = dateStr.split("T");
  const [year, month, day] = datePart.split("-");
  const [hour, minute] = timePart.split(":");
  return `${day}/${month}/${year} ${hour}:${minute}`;
}

const EditReunion: React.FC<EditReunionProps> = ({ details, onClose }) => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );

  const [familyOptions, setFamilyOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [isAllFamilies, setIsAllFamilies] = useState(false);

  const { mutateAsync: updateReunion } = useUpdateReunion();

  // Load families
  useEffect(() => {
    if (!associationId) return;

    ReunionServiceApi.getFamilies(associationId)
      .then((res) => {
        const options = res.map((family: any) => {
          const father = family.father
            ? `${family.father.lastName.toUpperCase()} ${
                family.father.firstName
              }`
            : "-";
          const mother = family.mother
            ? `${family.mother.lastName.toUpperCase()} ${
                family.mother.firstName
              }`
            : "-";
          return {
            label: `${father} & ${mother}`,
            value: family.id,
          };
        });
        setFamilyOptions(options);
      })
      .catch((e) => console.error("Error fetching families", e));
  }, [associationId]);

  // Prepare initial values
  const initialValues = useMemo(() => {
    const vals: Record<string, any> = {};
    ReunionFields.forEach((field) => {
      if (field.name === "familyIds") {
        vals[field.name] = details?.familyIds ?? [];
      } else if (field.name === "date" && details?.date) {
        vals[field.name] = convertDateForInput(details.date);
      } else {
        vals[field.name] = details?.[field.name] ?? "";
      }
    });
    vals.associationId = associationId ?? 0;
    return vals;
  }, [details, associationId]);

  const fieldsWithOptions = useMemo(() => {
    return ReunionFields.map((field) =>
      field.name === "familyIds" ? { ...field, options: familyOptions } : field
    );
  }, [familyOptions]);

  // Submit logic
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      await updateReunion({
        reunionId: details?.id,
        data: {
          ...values,
          date: formatDateForBackend(values.date),
          familyIds: isAllFamilies ? [] : values.familyIds,
        },
      });
      onClose();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <Box p={4}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema(isAllFamilies)}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, handleSubmit, isSubmitting, dirty }) => (
          <Form>
            <Flex direction="column" gap={4}>
              <Checkbox
                isChecked={isAllFamilies}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setIsAllFamilies(checked);
                  if (checked) setFieldValue("familyIds", []);
                }}
              >
                Reunion for all families
              </Checkbox>

              {fieldsWithOptions.map((field) => {
                if (field.name === "familyIds") {
                  return (
                    <Box
                      key={field.name}
                      maxHeight="300px"
                      overflowY="auto"
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="md"
                      p={3}
                    >
                      <Input
                        size="sm"
                        placeholder="Search family..."
                        mb={2}
                        onChange={() => {}}
                        isDisabled={isAllFamilies}
                      />
                      <VStack align="start" spacing={2}>
                        {(field.options || []).map(({ label, value }) => (
                          <Checkbox
                            key={value}
                            isChecked={values.familyIds.includes(value)}
                            onChange={() => {
                              const selected = values.familyIds || [];
                              const updated = selected.includes(value)
                                ? selected.filter((v: string) => v !== value)
                                : [...selected, value];
                              setFieldValue("familyIds", updated);
                            }}
                            isDisabled={isAllFamilies}
                          >
                            <Text fontSize="sm">{label}</Text>
                          </Checkbox>
                        ))}
                      </VStack>
                    </Box>
                  );
                }

                return <RenderFormBuilder key={field.name} field={field} />;
              })}
            </Flex>

            <FooterActions
              onClose={onClose}
              handleSave={handleSubmit}
              isDisabled={!dirty}
              isSaving={isSubmitting}
              cancelText="Cancel"
              saveText="Update"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditReunion;
