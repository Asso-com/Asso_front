import { Input, type InputProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { type FieldInputProps } from "formik";

interface BasicInputProps extends InputProps {
  formikField?: Partial<FieldInputProps<any>>;
  placeholder?: string;
  fontSize?: number;
}

const BasicInput: React.FC<BasicInputProps> = ({
  type,
  placeholder = "Enter text",
  fontSize = 14,
  formikField = {},
  ...inputProps
}) => {
  const { t } = useTranslation();
  const translatedPlaceholder = t(placeholder);

  return (
    <Input
      type={type}
      placeholder={translatedPlaceholder}
      fontSize={fontSize}
      sx={{
        _disabled: {
          opacity: 0.8,
          color: "black",
          backgroundColor: "#e2e8f0",
          cursor: "not-allowed",
        },
        _readOnly: {
          opacity: 0.9,
          backgroundColor: "#f8f9fa",
          cursor: "default",
        },
      }}
      {...inputProps}
      {...formikField}
    />
  );
};

export default BasicInput;
