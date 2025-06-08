import React from "react";
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  type CheckboxProps,
} from "@chakra-ui/react";
import TextLabel from "@components/ui/TextLabel";

export type Option = {
  label: string;
  value: string | number;
};

interface MultiSelectCheckboxProps {
  options: Option[];
  selectedValues: (string | number)[];
  onChange: (selected: (string | number)[]) => void;
  label?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  checkboxProps?: CheckboxProps;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({
  options,
  selectedValues,
  onChange,
  label,
  isRequired = false,
  isInvalid = false,
  errorMessage,
  ...inputProps
}) => {
  const handleCheckboxChange = (value: string | number) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      {label && (
        <Flex align="center">
          <Flex mr={2} justifyContent="space-between">
            <TextLabel label={label} />
            {isRequired && (
              <Box as="span" color="red.500" ml={1}>
                *
              </Box>
            )}
          </Flex>
        </Flex>
      )}
      <Flex gap={4} wrap="wrap">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            value={String(option.value)}
            isChecked={selectedValues.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
            {...inputProps}
          >
            <TextLabel label={option.label} fontSize={"sm"} />
          </Checkbox>
        ))}
      </Flex>
      {isInvalid && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default MultiSelectCheckbox;
