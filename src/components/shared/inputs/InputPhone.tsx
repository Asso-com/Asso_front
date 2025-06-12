import {
  Flex,
  FormControl,
  Box,
  FormErrorMessage,
  type FormControlProps,
} from "@chakra-ui/react"
import TextLabel from "../../ui/TextLabel"
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import { useTranslation } from "react-i18next"
import { type FieldInputProps } from "formik"
import { useDirection } from "@hooks/useDirection"

interface InputPhoneProps extends Omit<FormControlProps, "onChange"> {
  label?: string
  labelDirection?: "top" | "left"
  name: string
  type?: string
  helpText?: string
  isRequired?: boolean
  isInvalid?: boolean
  errorMessage?: string
  onChange?: (value: string) => void
  formikField?: Partial<FieldInputProps<any>>
  defaultCountry?: string
  value?: string
}

const InputPhone: React.FC<InputPhoneProps> = ({
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
  defaultCountry = "us",
  value,
  ...inputProps
}) => {
  const { t } = useTranslation()

  const { isRTL } = useDirection()

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired} {...inputProps}>
      <Flex
        direction={labelDirection === "top" ? "column" : "row"}
        align={labelDirection === "top" ? "flex-start" : "center"}
        gap={1}
      >
        {label && (
          <Flex align="center">
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
          </Flex>
        )}
        <Box
          className="chakra-phone-wrapper"
          w="100%"
          sx={{
            ".react-international-phone-input-container": {
              borderRadius: "0.375rem",
              border: "1px solid",
              borderColor: isInvalid ? "red.500" : "gray.200",
              padding: "2px",
              direction: isRTL ? "rtl" : "ltr",
            },
            ".react-international-phone-country-selector-button": {
              borderTopLeftRadius: isRTL ? 0 : "0.375rem",
              borderBottomLeftRadius: isRTL ? 0 : "0.375rem",
              borderTopRightRadius: isRTL ? "0.375rem" : 0,
              borderBottomRightRadius: isRTL ? "0.375rem" : 0,
              backgroundColor: "gray.50",
              borderRight: isRTL ? "none" : "1px solid",
              borderLeft: isRTL ? "1px solid" : "none",
              borderColor: "gray.200",
            },
            ".react-international-phone-input": {
              height: "2.5rem",
              paddingLeft: "0.75rem",
              paddingRight: "0.75rem",
              border: "none",
              width: "100%",
              outline: "none",
              fontSize: "1rem",
              textAlign: isRTL ? "right" : "left",
            },
            // ...(isRTL && {
            //   ".react-international-phone-country-selector-dropdown": {
            //     right: 0,
            //     left: "auto",
            //     direction: "ltr",
            //     textAlign: "left",
            //   },
            //   ".react-international-phone-country-selector-search-input": {
            //     direction: "ltr",
            //   },
            // }),
          }}
        >
          <PhoneInput
            defaultCountry={defaultCountry}
            value={formikField?.value ?? value}
            onChange={phone => {
              if (formikField?.onChange) {
                formikField.onChange({ target: { name, value: phone } })
              } else {
                onChange?.(phone)
              }
            }}
            inputClassName="custom-phone-input"
          />
        </Box>
      </Flex>

      {isInvalid && errorMessage && (
        <FormErrorMessage fontSize="sm">{t(errorMessage)}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default InputPhone
