import React, { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import {
  Box,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  CircularProgress,
  useColorModeValue,
  FormErrorMessage
} from "@chakra-ui/react";
import { FiClock, FiEdit2 } from "react-icons/fi";
import TextLabel from "@components/ui/TextLabel"

interface TimeInputProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (time: string) => void;
  isRequired?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  label,
  name,
  value = "",
  onChange,
  isDisabled = false,
  isLoading = false,
  isInvalid = false,
  isRequired = false,
  errorMessage="",
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  

  const colors = {
    bg: useColorModeValue("white", "gray.800"),
    border: useColorModeValue("gray.200", "gray.600"),
    focus: useColorModeValue("blue.500", "blue.300"),
    icon: useColorModeValue("gray.400", "gray.500"),
  };

  const triggerPicker = () => {
    if (!isDisabled && !isLoading) {
      inputRef.current?.focus();
      inputRef.current?.showPicker?.();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <FormControl isInvalid={isInvalid} isDisabled={isDisabled}>
            <Flex align="center" mb={2}>
              {label && <TextLabel label={label} />}
              {isRequired && (
                <Box as="span" color="red.500" ml={1}>
                  *
                </Box>
              )}
            </Flex>
      <Flex align="center" gap={4}>
        <Box position="relative" flex={1} maxW="300px">
          {isLoading ? (
            <Flex
              align="center"
              justify="center"
              h="40px"
              bg={colors.bg}
              border="1px solid"
              borderColor={colors.border}
              borderRadius="md"
            >
              <CircularProgress isIndeterminate size="20px" color="blue.500" />
            </Flex>
          ) : (
            <InputGroup>
              <Input
                ref={inputRef}
                id={name}
                name={name}
                type="time"
                value={value}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                isDisabled={isDisabled}
                focusBorderColor={colors.focus}
                _hover={{ borderColor: isDisabled ? colors.border : colors.focus }}
                sx={{
                  "&::-webkit-calendar-picker-indicator": {
                    opacity: 0,
                    position: "absolute",
                    right: 0,
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  },
                }}
              />
              <InputRightElement pointerEvents="none" color={focused ? colors.focus : colors.icon}>
                <FiClock />
              </InputRightElement>
            </InputGroup>
          )}

          {!isDisabled && !isLoading && value && (
            <IconButton
              icon={<FiEdit2 />}
              aria-label="Modifier l'heure"
              size="xs"
              position="absolute"
              top={-2}
              right={-2}
              borderRadius="full"
              colorScheme="blue"
              onClick={triggerPicker}
              zIndex={1}
            />
          )}
        </Box>
      </Flex>
{isInvalid && errorMessage && (
  <FormErrorMessage>{errorMessage}</FormErrorMessage>
)}

    </FormControl>

  );
};

export default TimeInput;
