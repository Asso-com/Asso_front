import { Field, type FieldProps } from "formik";
import { get } from "lodash";
import InputPhone from "../inputs/InputPhone";
import GenericInput from "../inputs/GenericInput";
import type { Field as FieldType } from "../../../types/formTypes";
import SelectDropdown from "../inputs/GenericSelectDropdown";
import GenericCheckbox from "../inputs/GenericCheckbox";
import MultiSelectCheckbox from "../inputs/MultiSelectCheckbox";
import GenericRadioGroup from "../inputs/GenericRadioGroup";
import MultiTextInput from "../inputs/MultiTextInput";
import FileInput from "../inputs/FileInput";
import TimeInput from "../inputs/TimeInput";
import MultiSelectDropdown from "../inputs/MultiSelectDropdown";

interface RenderFormBuilderProps {
  field: FieldType & {
    onChange?: (value: any) => void;
  };
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
    onChange: customOnChange,
  } = field;

  const fullName =
    arrayName !== undefined && index !== undefined
      ? `${arrayName}.${index}.${name}`
      : name;

  return (
    <Field name={fullName}>
      {({ field: formikField, form }: FieldProps) => {
        const rawError = get(form.errors, fullName);
        const error = typeof rawError === "string" ? rawError : undefined;
        const touched = get(form.touched, fullName);
        const isInvalid = !!error && !!touched;

        const formattedValue =
          type === "date" && formikField.value
            ? new Date(formikField.value).toISOString().split("T")[0]
            : formikField.value;

        const handleValueChange = (value: any) => {
          form.setFieldValue(fullName, value);
          if (customOnChange) {
            customOnChange(value);
          }
        };

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

        switch (type) {
          case "phone":
            return (
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
            );

          case "file":
            return (
              <FileInput
                label={label}
                value={formikField.value || ""}
                isRequired={validationRules?.required}
                isInvalid={isInvalid}
                errorMessage={error}
                id={fullName}
                onChange={(file) => form.setFieldValue(fullName, file)}
                //  onChange={handleFileChange}
                {...inputProps}
              />
            );

          case "multi-select-checkbox":
            return (
              <MultiSelectCheckbox
                label={label}
                options={options || []}
                selectedValues={formikField.value || []}
                onChange={(selected) => form.setFieldValue(fullName, selected)}
                isInvalid={isInvalid}
                errorMessage={error}
                isRequired={validationRules?.required}
                {...inputProps}
              />
            );

          case "string-array":
            return (
              <MultiTextInput
                label={label}
                values={formikField.value || [""]}
                onChange={(newValues) =>
                  form.setFieldValue(fullName, newValues)
                }
                isInvalid={isInvalid}
                errorMessage={error}
                isRequired={validationRules?.required}
                labelDirection={labelDirection}
                placeholder={placeholder}
                {...inputProps}
              />
            );

          case "checkbox":
            return (
              <GenericCheckbox
                formikField={formikField}
                label={label}
                id={fullName}
                placeholder={placeholder}
                isChecked={!!formikField.value}
                isRequired={validationRules?.required}
                isError={isInvalid}
                errorMessage={error}
                onChange={(value) => {
                  form.setFieldValue(fullName, value);
                }}
                {...inputProps}
              />
            );

          case "date":
            return (
              <GenericInput
                label={label}
                isRequired={validationRules?.required}
                isInvalid={isInvalid}
                errorMessage={error}
                id={fullName}
                placeholder={placeholder}
                type="date"
                formikField={formikField}
                labelDirection={labelDirection}
                onChange={handleDateChange}
                value={formattedValue}
                {...inputProps}
              />
            );

          case "select":
            return (
              <SelectDropdown
                labelDirection={labelDirection}
                isRequired={validationRules?.required}
                key={fullName}
                isInvalid={isInvalid}
                label={label}
                id={fullName}
                options={options}
                placeholder={placeholder}
                onChange={(selectedOption) => {
                  const option = selectedOption as Option | null;
                  form.setFieldValue(fullName, option?.value ?? "");
                }}
                onBlur={formikField.onBlur}
                value={options?.find(
                  (option) => option.value === formikField.value
                )}
                menuPortalStyles={{ zIndex: 99999 }}
                errorMessage={error}
                {...inputProps}
              />
            );

          case "radio":
            return (
              <GenericRadioGroup
                name={fullName}
                label={label}
                options={options || []}
                selectedValue={formikField.value}
                onChange={(value) => handleValueChange(value)}
                isError={isInvalid}
                errorMessage={error}
                isRequired={validationRules?.required}
                labelDirection={labelDirection}
                {...inputProps}
              />
            );
          //           case "datetime-local":
          // return (
          //   <GenericInput
          //     label={label}
          //     isRequired={validationRules?.required}
          //     isInvalid={isInvalid}
          //     errorMessage={error}
          //     id={fullName}
          //     placeholder={placeholder}
          //     type="datetime-local"
          //     formikField={formikField}
          //     labelDirection={labelDirection}
          //     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          //       form.setFieldValue(fullName, e.target.value)
          //     }
          //     value={formikField.value || ""}
          //     {...inputProps}
          //   />
          // );

          case "multiselect":
            return (
              <MultiSelectDropdown
                label={label}
                value={formikField.value || []}
                onChange={handleValueChange}
                options={options || []}
                placeholder={placeholder}
                isInvalid={isInvalid}
                errorMessage={error}
              />
            );
          case "time":
            return (
              <TimeInput
                label={label}
                isRequired={validationRules?.required}
                isInvalid={isInvalid}
                errorMessage={error}
                id={fullName}
                placeholder={placeholder}
                value={formikField.value || ""}
                onChange={(value) => form.setFieldValue(fullName, value)}
                formikField={formikField}
                labelDirection={labelDirection}
                {...inputProps}
              />
            );

          default:
            return (
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
        }
      }}
    </Field>
  );
};

export default RenderFormBuilder;
