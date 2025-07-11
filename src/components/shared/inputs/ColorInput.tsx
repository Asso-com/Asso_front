import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import TextLabel from "@components/ui/TextLabel";

interface ColorInputProps {
  label: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const ColorInput: React.FC<ColorInputProps> = ({
  label,
  isRequired = false,
  isInvalid = false,
  errorMessage,
  id,
  value,
  onChange,
  onBlur,
  placeholder = "#000000",
  disabled = false,
}) => {
  const colorRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^#[0-9A-Fa-f]{0,6}$/.test(newValue) || newValue === "") {
      onChange(newValue);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      {label && (
        <Flex align="center" mb={2}>
          <Flex mr={2} justifyContent="space-between" alignItems="center">
            <TextLabel label={label} />
            {isRequired && (
              <Box as="span" color="red.500" ml={1}>
                *
              </Box>
            )}
          </Flex>
        </Flex>
      )}

      <Flex align="center" gap={3}>
        <Input
          id={id}
          type="text"
          value={value}
          onChange={handleTextChange}
          onBlur={onBlur}
          placeholder={placeholder}
          isDisabled={disabled}
          width="90px"
          height="30px"
          fontSize="sm"
          textAlign="center"
          borderColor={isInvalid ? "red.500" : "gray.300"}
        />

        <Box
          as="input"
          type="color"
          ref={colorRef}
          value={value}
          onChange={handleColorChange}
          width="30px"
          height="30px"
          borderRadius="md"
          cursor={disabled ? "not-allowed" : "pointer"}
          title={`Modifier la couleur : ${value || "#000000"}`}
        />
      </Flex>

      {isInvalid && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default ColorInput;
