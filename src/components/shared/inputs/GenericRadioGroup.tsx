import {
  FormControl,
  RadioGroup,
  Radio,
  FormErrorMessage,
  Stack,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import TextLabel from "@components/ui/TextLabel";

type Option = {
  label: string;
  value: string;
};

interface GenericRadioGroupProps {
  label?: string;
  options: Option[];
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
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
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        {...inputProps}
      >
        <Stack direction={direction}>
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              defaultChecked={option.value === value}
            >
              <Text fontSize="sm">{t(option.label)}</Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      {isError && errorMessage && (
        <FormErrorMessage>{t(errorMessage)}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default GenericRadioGroup;