import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormErrorMessage,
  Stack,
  Box,
  Flex,
  Text,
  type RadioGroupProps,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import TextLabel from "@components/ui/TextLabel";

type Option = {
  label: string;
  value: string | number | boolean;
};

interface GenericRadioGroupProps {
  label?: string;
  options: Option[];
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  name: string;
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  direction?: "row" | "column";
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

const GenericRadioGroup: React.FC<GenericRadioGroupProps> = ({
  label,
  options = [],
  isRequired = false,
  isError = false,
  errorMessage = "",
  name,
  value,
  onChange,
  onBlur,
  direction = "row",
  ...inputProps
}) => {
  const { t } = useTranslation();

  return (
    <FormControl isInvalid={isError} isRequired={isRequired} mb={2}>
      <Flex align="center" mb={2}>
        {label && <TextLabel label={label} />}
        {isRequired && (
          <Box as="span" color="red.500" ml={1}>
            *
          </Box>
        )}
      </Flex>

      <RadioGroup
        name={name}
        value={value?.toString()}
        onChange={(stringValue) => {
          const selectedOption = options.find(
            (option) => option.value.toString() === stringValue
          );
          if (selectedOption) {
            onChange(selectedOption.value);
          }
        }}
        onBlur={onBlur}
        {...inputProps}
      >
        <Stack direction={direction}>
          {options.map((option) => (
            <Radio
              key={option.value.toString()}
              value={option.value.toString()}
            >
              <Text fontSize="sm">{t(option.label)}</Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      {isError && <FormErrorMessage>{t(errorMessage)}</FormErrorMessage>}
    </FormControl>
  );
};

export default GenericRadioGroup;
