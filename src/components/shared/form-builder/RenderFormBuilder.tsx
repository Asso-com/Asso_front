import React from "react";
import { Field, type FieldProps } from "formik";
import { get } from "lodash";

import InputPhone from "../inputs/InputPhone";
import GenericInput from "../inputs/GenericInput";
import type { Field as FieldType } from "../../../types/formTypes";
import SelectDropdown from "../inputs/GenericSelectDropdown";
import GenericCheckbox from "../inputs/GenericCheckbox";
import MultiSelectCheckbox from "../inputs/MultiSelectCheckbox";
import MultiTextInput from "../inputs/MultiTextInput";

interface RenderFormBuilderProps {
  field: FieldType;
  arrayName?: string;
  index?: number;
  labelDirection?: "top" | "left";
}
type Option = {
  label: string;
  value: string | number;
};
const RenderFormBuilder: React.FC<RenderFormBuilderProps> = ({
  field,
  arrayName,
  index,
  labelDirection = "top",
}) => {
  const {
    name,
    label,
    validationRules,
    type,
    options,
    placeholder,
    inputProps,
  } = field;

  const fullName =
    arrayName !== undefined && index !== undefined
      ? `${arrayName}.${index}.${name}`
      : name;

  return (
    <Field name={fullName}>
      {({ field: formikField, form }: FieldProps) => {
        const error = get(form.errors, fullName);
        const touched = get(form.touched, fullName);
        const isInvalid = !!error && !!touched;

        const formattedValue =
          type === "date" && formikField.value
            ? new Date(formikField.value).toISOString().split("T")[0]
            : formikField.value;

        const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const formattedDate = new Date(e.target.value)
            .toISOString()
            .split("T")[0];
          formikField.onChange({
            target: {
              name: formikField.name,
              value: formattedDate,
            },
          });
        };

        return type === "phone" ? (
          <InputPhone
            label={label}
            isRequired={validationRules?.required}
            isInvalid={isInvalid}
            errorMessage={error}
            name={fullName}
            formikField={formikField}
            labelDirection={labelDirection}
            {...inputProps}
          />
        ) : type === "multi-select-checkbox" ? (
          <MultiSelectCheckbox
            label={label}
            options={options || []}
            selectedValues={formikField.value || []}
            onChange={(selected) => form.setFieldValue(fullName, selected)}
            isInvalid={!!error && touched}
            errorMessage={error}
            isRequired={validationRules?.required}
            {...inputProps}
          />
        ) : type === "string-array" ? (
          <MultiTextInput
            label={field.label}
            values={formikField.value || [""]}
            onChange={(newValues) => form.setFieldValue(fullName, newValues)}
            isInvalid={isInvalid}
            errorMessage={error}
            isRequired={field.validationRules?.required}
            labelDirection={labelDirection}
            placeholder={placeholder}
            {...inputProps}
          />
        ) : type === "checkbox" ? (
          <GenericCheckbox
            formikField={formikField}
            label={label}
            id={fullName}
            placeholder={placeholder}
            isChecked={!!formikField.value}
            isRequired={validationRules?.required}
            isError={!!error && !!touched}
            errorMessage={error}
            onChange={(value) => {
              form.setFieldValue(fullName, value);
            }}
            {...inputProps}
          />
        ) : type === "date" ? (
          <GenericInput
            label={label}
            isRequired={validationRules?.required}
            isInvalid={error && touched}
            errorMessage={error}
            id={fullName}
            placeholder={placeholder}
            type={"date"}
            formikField={formikField}
            labelDirection={labelDirection}
            onChange={handleDateChange}
            value={formattedValue}
            {...inputProps}
          />
        ) : type === "select" ? (
          <SelectDropdown
            labelDirection={labelDirection}
            isRequired={validationRules?.required}
            key={fullName}
            isInvalid={error && touched}
            label={label}
            id={fullName}
            options={options}
            placeholder={placeholder}
            onChange={(selectedOption) => {
              const option = selectedOption as Option | null;
              form.setFieldValue(fullName, option?.value ?? "");
              // form.setFieldTouched(fullName, true);
            }}
            onBlur={formikField.onBlur}
            value={options?.find((option) => option.value == formikField.value)}
            menuPortalStyles={{ zIndex: 99999 }}
            errorMessage={error}
            {...inputProps}
          />
        ) : (
          <GenericInput
            label={label}
            isRequired={validationRules?.required}
            isInvalid={isInvalid}
            errorMessage={error}
            id={fullName}
            placeholder={placeholder}
            type={type || "text"}
            formikField={formikField}
            labelDirection={labelDirection}
            {...inputProps}
          />
        );
      }}
    </Field>
  );
};

export default RenderFormBuilder;
