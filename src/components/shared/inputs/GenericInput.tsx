import { Flex, FormControl, Box, FormErrorMessage } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import BasicInput from "../../ui/BasicInput"
import BasicTextArea from "../../ui/BasicTextArea"
import TextLabel from "../../ui/TextLabel"

interface GenericInputProps {
  labelDirection?: "top" | "left"
  label?: string
  name: string
  type?: string
  helpText?: string
  isRequired?: boolean
  isInvalid?: boolean
  errorMessage?: string
  onChange?: (value: string) => void
  formikField?: any
  [key: string]: any
}

const GenericInput: React.FC<GenericInputProps> = ({
  labelDirection = "top",
  label,
  name,
  type = "text",
  helpText,
  isRequired = false,
  isInvalid = false,
  errorMessage,
  onChange,
  formikField = {},
  ...inputProps
}) => {
  const { t } = useTranslation()

  const commonProps = {
    name,
    id: name,
    type,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange?.(e.target.value),
    ...inputProps,
  }

  const renderInputField = () => {
    if (type === "textarea") {
      return <BasicTextArea {...commonProps} formikField={formikField} />
    }
    return <BasicInput {...commonProps} formikField={formikField} />
  }

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      <Flex
        direction={labelDirection === "top" ? "column" : "row"}
        align={labelDirection === "top" ? "flex-start" : "center"}
        gap={1}
      >
        {(label || helpText) && (
          <Flex align="center">
            {label && (
              <Flex
                width={labelDirection === "top" ? "auto" : "100px"}
                mr={2}
                justifyContent="space-between"
              >
                <TextLabel label={label} />
                {isRequired && (
                  <Box as="span" color="red.500" ml={1}>
                    *
                  </Box>
                )}
              </Flex>
            )}
          </Flex>
        )}

        {renderInputField()}
      </Flex>

      {isInvalid && errorMessage && (
        <FormErrorMessage fontSize="sm">{t(errorMessage)}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default GenericInput
