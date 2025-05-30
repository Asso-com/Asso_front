import React from "react";
import { Field, type FieldProps } from "formik";
import { get } from "lodash";

import InputPhone from "../inputs/InputPhone";
import GenericInput from "../inputs/GenericInput";
import type { Field as FieldType } from "../../../types/formTypes";

interface RenderFormBuilderProps {
  field: FieldType;
  arrayName?: string;
  index?: number;
  labelDirection?: "top" | "left";
}

const RenderFormBuilder: React.FC<RenderFormBuilderProps> = ({
  field,
  arrayName,
  index,
  labelDirection = "top",
}) => {
  const { name, label, validationRules, type, placeholder, inputProps } = field;

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
