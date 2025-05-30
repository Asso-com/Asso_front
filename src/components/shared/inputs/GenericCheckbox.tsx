import React from "react";
import { FormControl, Checkbox, FormErrorMessage, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import TextLabel from "@components/ui/TextLabel";
import type { FieldInputProps } from "formik";

type GenericCheckboxProps = {
  label: string;
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  formikField?: Partial<FieldInputProps<any>>;
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
  [key: string]: any;
};

const GenericCheckbox: React.FC<GenericCheckboxProps> = ({
  label,
  isRequired = false,
  isError = false,
  errorMessage,
  formikField = {},
  onChange,
  isChecked,
  ...inputProps
}) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    formikField.onChange?.(e); // keeps Formik's internal change tracking
    onChange?.(value); // passes boolean value
  };

  return (
    <FormControl isInvalid={isError} isRequired={isRequired} mb={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <Checkbox
          {...formikField}
          {...inputProps}
          isChecked={isChecked}
          onChange={handleChange}
        />
        <TextLabel label={label} />
      </Box>
      {isError && errorMessage && (
        <FormErrorMessage>{t(errorMessage)}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default GenericCheckbox;
