import Select, { type SingleValue, type MultiValue } from "react-select"
import { Box, Flex, Text, Icon } from "@chakra-ui/react"
import { CiSearch } from "react-icons/ci"
import { useTranslation } from "react-i18next"
import { FormControl, FormErrorMessage } from "@chakra-ui/react"
import TextLabel from "@components/ui/TextLabel"

interface Option {
  label: string
  value: string | number | boolean
  [key: string]: any
}

type SelectValue = SingleValue<Option> | MultiValue<Option>

interface SelectDropdownProps {
  options: Option[]
  defaultValue?: Option | Option[]
  onChange: (value: SelectValue) => void
  placeholder?: string
  isClearable?: boolean
  isSearchable?: boolean
  isDisabled?: boolean
  width?: string | number
  isMulti?: boolean
  onKeyDown?: React.KeyboardEventHandler
  onInputChange?: (newValue: string, actionMeta: any) => void
  getOptionLabel?: (option: Option) => string
  inputValue?: string
  value?: SelectValue
  customLabelRenderer?: (
    option: Option,
    meta: { inputValue: string }
  ) => React.ReactNode
  menuPortalStyles?: React.CSSProperties
  menuListStyles?: React.CSSProperties
  label?: string
  labelDirection?: "top" | "left"
  isInvalid?: boolean
  isRequired?: boolean
  errorMessage?: string
  key?: string | number
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  defaultValue,
  onChange,
  placeholder = "Select Option",
  isClearable = false,
  isSearchable = true,
  isDisabled = false,
  width,
  isMulti = false,
  onKeyDown,
  onInputChange,
  getOptionLabel,
  inputValue,
  value,
  customLabelRenderer,
  menuPortalStyles = {},
  menuListStyles = {},
  label,
  labelDirection = "top",
  isInvalid,
  isRequired = false,
  errorMessage = "This field is required",
  key,
}) => {
  const { t } = useTranslation()

  const customStyles = {
    control: (css: any, state: any) => ({
      ...css,
      width: width,
      borderColor: state.isFocused ? "#00286D" : "#d9d9d9",
      boxShadow: state.isFocused ? "0 0 0 1px #00286D" : "none",
      backgroundColor: state.isDisabled ? "#e2e8f0" : "white",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      opacity: state.isDisabled ? 0.8 : 1,
      "&:hover": {
        borderColor: state.isDisabled ? "#d3d3d3" : "#00286D",
      },
    }),
    menu: (css: any) => ({
      ...css,
    }),
    menuList: (provided: any) => ({
      ...provided,
      ...menuListStyles,
    }),
    menuPortal: (css: any) => ({
      ...css,
      ...menuPortalStyles,
    }),
    option: (css: any, { isSelected, isFocused }: any) => ({
      ...css,
      backgroundColor: isDisabled
        ? "#f0f0f0"
        : isSelected
        ? "#00286D"
        : isFocused
        ? "#d1e1ff"
        : "white",
      color: isDisabled
        ? "#a0a0a0"
        : isSelected
        ? "white"
        : isFocused
        ? "#00286D"
        : "black",
      fontSize: "12px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#a3b3ff",
      },
    }),
    singleValue: (css: any, { isDisabled }: any) => ({
      ...css,
      fontSize: "12px",
      color: isDisabled ? "black" : "#00286D",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    multiValue: (base: any) => ({
      ...base,
      borderRadius: "5px",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      fontSize: "12px",
      color: "#00286D",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: "inherit",
      "&:hover": {
        backgroundColor: "#a3b3ff",
        color: "inherit",
      },
    }),
  }

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired} key={key}>
      <Flex
        direction={labelDirection === "top" ? "column" : "row"}
        align={labelDirection === "top" ? "flex-start" : "center"}
        gap={1}
      >
        {label && (
          <Flex
            width={labelDirection === "top" ? "auto" : "100px"}
            minW={labelDirection === "top" ? "auto" : "100px"}
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
        <Box width="100%">
          <Select
            menuPlacement="auto"
            styles={customStyles}
            value={value}
            options={options?.map(option => ({
              ...option,
              label: t(option.label),
            }))}
            placeholder={
              isSearchable ? (
                <Flex align="center" gap={2}>
                  <Icon as={CiSearch} />
                  <Text fontSize="12px">
                    {t(placeholder) || t("Select Option")}
                  </Text>
                </Flex>
              ) : (
                <Text fontSize="12px">
                  {t(placeholder) || t("Select Option")}
                </Text>
              )
            }
            onChange={onChange}
            menuPortalTarget={document.body}
            isSearchable={isSearchable}
            isDisabled={isDisabled}
            isClearable={isClearable}
            formatOptionLabel={customLabelRenderer || formatOptionLabel}
            defaultValue={defaultValue}
            onKeyDown={onKeyDown}
            isMulti={isMulti}
            onInputChange={onInputChange}
            getOptionLabel={getOptionLabel}
            inputValue={inputValue}
          />
        </Box>
      </Flex>

      {isInvalid && errorMessage && (
        <FormErrorMessage>{t(errorMessage)}</FormErrorMessage>
      )}
    </FormControl>
  )
}

const formatOptionLabel = (
  props: Option,
  { inputValue }: { inputValue: string }
) => {
  if (props.label) {
    const index = props.label.toLowerCase().indexOf(inputValue?.toLowerCase())

    if (index >= 0) {
      const before = props.label.substring(0, index)
      const match = props.label.substring(index, index + inputValue.length)
      const after = props.label.substring(index + inputValue.length)

      return (
        <Box
          display="flex"
          alignItems="center"
          fontSize="sm"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          <Text as="span" noOfLines={1}>
            {before}
            <Text as="span" fontWeight="bold" color="red.500">
              {match}
            </Text>
            {after}
          </Text>
        </Box>
      )
    }

    return (
      <Box
        display="flex"
        alignItems="center"
        fontSize="sm"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        <Text as="span" noOfLines={1}>
          {props.label}
        </Text>
      </Box>
    )
  }
  return null
}

export default SelectDropdown
