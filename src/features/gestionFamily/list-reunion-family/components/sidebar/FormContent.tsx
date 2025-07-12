import React, { forwardRef, useImperativeHandle } from "react";
import { Flex, Checkbox, Box, VStack, Text, Input } from "@chakra-ui/react";
import { Formik } from "formik";

import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import { useFamilyReunionForm } from "../../hooks/useFamilyReunionForm";

type FormContentRef = {
  submitForm: () => Promise<any | null>;
  resetForm: () => void;
};

function FamilyCheckboxList({
  options,
  selectedValues,
  onChange,
  disabled,
}: {
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredOptions = React.useMemo(() => {
    return options.filter(({ label }) =>
      label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, options]);

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <Box
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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        isDisabled={disabled}
      />
      <VStack align="start" spacing={2}>
        {filteredOptions.map(({ label, value }) => (
          <Checkbox
            key={value}
            isChecked={selectedValues.includes(value)}
            onChange={() => toggleValue(value)}
            isDisabled={disabled}
          >
            <Text fontSize="sm">{label}</Text>
          </Checkbox>
        ))}
      </VStack>
    </Box>
  );
}

const FormContent = forwardRef<FormContentRef>((_, ref) => {
  const {
    initialValues,
    fieldsWithOptions,
    validationSchema,
    isAllFamilies,
    setIsAllFamilies,
    formikRef,
    submitForm,
    resetForm,
  } = useFamilyReunionForm();

  useImperativeHandle(ref, () => ({
    submitForm,
    resetForm,
  }));

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={() => {}}
    >
      {(formik) => (
        <Flex direction="column" gap={4}>
          <Checkbox
            isChecked={isAllFamilies}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsAllFamilies(checked);
              if (checked) {
                formik.setFieldValue("familyIds", []);
              }
            }}
          >
            Réunion pour toutes les familles
          </Checkbox>

          {fieldsWithOptions.map((field) => {
            if (field.name === "familyIds") {
              return (
                <FamilyCheckboxList
                  key={field.name}
                  options={field.options || []}
                  selectedValues={formik.values.familyIds || []}
                  onChange={(vals) => formik.setFieldValue("familyIds", vals)}
                  disabled={isAllFamilies}
                />
              );
            }
            return <RenderFormBuilder key={field.name} field={field} />;
          })}
        </Flex>
      )}
    </Formik>
  );
});

export default FormContent;
