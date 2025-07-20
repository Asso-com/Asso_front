import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  type InputProps,
  Box,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { type FieldInputProps } from "formik";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface BasicInputProps extends InputProps {
  formikField?: Partial<FieldInputProps<any>>;
  placeholder?: string;
  fontSize?: number;
}

const BasicInput: React.FC<BasicInputProps> = ({
  type,
  placeholder = "Enter text",
  fontSize = "md",
  formikField = {},
  ...inputProps
}) => {
  const { t } = useTranslation();
  const translatedPlaceholder = t(placeholder);
  const [showPassword, setShowPassword] = useState(false);

  // default input
  const baseInput = (
    <Input
      type={type}
      placeholder={translatedPlaceholder}
      fontSize={fontSize}
      size={"md"}
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

  if (type === "email") {
    return (
      <InputGroup>
        {baseInput}
        <InputRightElement height="48px" pointerEvents="none">
          <Mail size={20} color="#718096" />
        </InputRightElement>
      </InputGroup>
    );
  }

  if (type === "password") {
    return (
      <InputGroup position="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={translatedPlaceholder}
          fontSize={fontSize}
          pl={12}
          pr={16}
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
        <InputRightElement height="48px">
          <IconButton
            aria-label={showPassword ? "Hide password" : "Show password"}
            icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onClick={() => setShowPassword((prev) => !prev)}
            variant="ghost"
            size="sm"
            color="gray.500"
            _hover={{ color: "brand.500" }}
          />
        </InputRightElement>
        <Box
          position="absolute"
          left={3}
          top="50%"
          transform="translateY(-50%)"
          pointerEvents="none"
        >
          <Lock size={20} color="#718096" />
        </Box>
      </InputGroup>
    );
  }

  return baseInput;
};

export default BasicInput;
