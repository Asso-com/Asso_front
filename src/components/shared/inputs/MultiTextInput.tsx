import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  InputGroup,
  InputRightElement,
  VStack,
  HStack,
  Box,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import BasicInput from "@components/ui/BasicInput";

interface DynamicStringInputsProps {
  label?: string;
  values: string[];
  onChange: (values: string[]) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  placeholder?: string;
  addButtonText?: string;
}

const MultiTextInput: React.FC<DynamicStringInputsProps> = ({
  label,
  values,
  onChange,
  isInvalid,
  errorMessage,
  isRequired,
  placeholder = "Enter value",
  addButtonText = "Add another",
  ...inputProps
}) => {
  const handleChange = (index: number, newValue: string) => {
    const updated = [...values];
    updated[index] = newValue;
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...values, ""]);
  };

  const handleRemove = (index: number) => {
    if (values.length === 1) return;
    const updated = values.filter((_, i) => i !== index);
    onChange(updated);
  };

  //const hoverBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const focusBorderColor = useColorModeValue("blue.500", "blue.300");
  const errorBorderColor = useColorModeValue("red.500", "red.300");

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      {label && (
        <FormLabel
          mb={2}
          fontSize="sm"
          fontWeight="medium"
          color="gray.700"
          _dark={{ color: "gray.300" }}
        >
          {label}
          {/* {isRequired && (
            <Box as="span" color="red.500" ml={1}>
              *
            </Box>
          )} */}
        </FormLabel>
      )}

      <VStack spacing={3} align="stretch">
        {values.map((value, index) => (
          <InputGroup key={index}>
            <BasicInput
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
              borderColor={borderColor}
              _hover={{ borderColor: borderColor }}
              _focus={{
                borderColor: focusBorderColor,
                boxShadow: "none",
              }}
              pr="2rem"
              isInvalid={isInvalid}
              errorBorderColor={errorBorderColor}
              {...inputProps}
            />
            {values.length > 1 && (
              <InputRightElement width="2rem">
                <IconButton
                  aria-label="Remove item"
                  icon={<CloseIcon boxSize={2} />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleRemove(index)}
                />
              </InputRightElement>
            )}
          </InputGroup>
        ))}

        <Box mt={1}>
          <HStack
            as="button"
            type="button"
            onClick={handleAdd}
            spacing={1}
            color={useColorModeValue("blue.600", "blue.300")}
            _hover={{ color: useColorModeValue("blue.700", "blue.200") }}
            transition="color 0.2s"
            alignItems="center"
            border="1px dashed"
            borderColor="gray.300"
            // _hover={{ backgroundColor: hoverBg }}
            width="fit-content"
            p={2}
          >
            <AddIcon boxSize={3} />
            <Text fontSize="sm" fontWeight="medium">
              {addButtonText}
            </Text>
          </HStack>
        </Box>
      </VStack>

      {isInvalid && errorMessage && (
        <FormErrorMessage mt={1} fontSize="xs">
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default MultiTextInput;
