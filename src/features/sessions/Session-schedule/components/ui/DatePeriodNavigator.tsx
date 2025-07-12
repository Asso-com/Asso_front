import { useEffect, useState, useMemo, useCallback } from "react";
import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Select, { type SingleValue, type StylesConfig } from "react-select";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";

export interface DatePeriod {
  value: number;
  label: string;
}

interface DatePeriodNavigatorProps {
  weeksOptions: DatePeriod[];
  onPeriodChange?: (period: DatePeriod) => void;
  defaultSelectedIndex?: number;
}

const DatePeriodNavigator: React.FC<DatePeriodNavigatorProps> = ({
  weeksOptions,
  onPeriodChange,
  defaultSelectedIndex = 0,
}) => {
  if (weeksOptions.length === 0) {
    return null;
  }

  const [currentIndex, setCurrentIndex] =
    useState<number>(defaultSelectedIndex);
  const [selectedPeriod, setSelectedPeriod] = useState<DatePeriod | null>(null);

  // Move all useColorModeValue calls to the top level
  const bgLight = useColorModeValue("#fff", "#2D3748");
  const borderLight = useColorModeValue("#E2E8F0", "#4A5568");
  const borderFocus = useColorModeValue("#3182ce", "#63B3ED");
  const textColor = useColorModeValue("#2D3748", "#F7FAFC");
  const placeholderColor = useColorModeValue("#A0AEC0", "#718096");
  const hoverBg = useColorModeValue("#F7FAFC", "#4A5568");
  const hoverBorder = useColorModeValue("#CBD5E0", "#718096");
  const optionHoverBg = useColorModeValue("#EBF8FF", "#2A4365");
  const selectedBg = useColorModeValue("#3182ce", "#63B3ED");
  const selectedActiveBg = useColorModeValue("#2B6CB0", "#4299E1");
  const optionActiveBg = useColorModeValue("#BEE3F8", "#2A4365");
  const dropdownColor = useColorModeValue("#718096", "#A0AEC0");
  const dropdownHoverColor = useColorModeValue("#4A5568", "#CBD5E0");
  const boxShadowLight = useColorModeValue(
    "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
  );
  const containerBg = useColorModeValue("gray.50", "gray.700");
  const containerBorder = useColorModeValue("gray.200", "gray.600");

  // Initialize with the specified default or first option
  useEffect(() => {
    if (weeksOptions.length > 0) {
      const initialIndex = Math.min(
        defaultSelectedIndex,
        weeksOptions.length - 1
      );
      const initialPeriod = weeksOptions[initialIndex];

      if (
        selectedPeriod === null ||
        selectedPeriod.value !== initialPeriod.value
      ) {
        setSelectedPeriod(initialPeriod);
        setCurrentIndex(initialIndex);
        onPeriodChange?.(initialPeriod);
      }
    }
  }, [weeksOptions, selectedPeriod, defaultSelectedIndex, onPeriodChange]);

  const updateSelection = useCallback(
    (newIndex: number) => {
      if (newIndex >= 0 && newIndex < weeksOptions.length) {
        const newPeriod = weeksOptions[newIndex];
        setCurrentIndex(newIndex);
        setSelectedPeriod(newPeriod);
        onPeriodChange?.(newPeriod);
      }
    },
    [weeksOptions, onPeriodChange]
  );

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      updateSelection(currentIndex - 1);
    }
  }, [currentIndex, updateSelection]);

  const handleNext = useCallback(() => {
    if (currentIndex < weeksOptions.length - 1) {
      updateSelection(currentIndex + 1);
    }
  }, [currentIndex, weeksOptions.length, updateSelection]);

  const handleSelectChange = useCallback(
    (option: SingleValue<DatePeriod>) => {
      if (option) {
        const index = weeksOptions.findIndex(
          (item) => item.value === option.value
        );
        if (index !== -1) {
          updateSelection(index);
        }
      }
    },
    [weeksOptions, updateSelection]
  );

  // Now create the colorValues object using the hook values
  const colorValues = useMemo(
    () => ({
      bgLight,
      borderLight,
      borderFocus,
      textColor,
      placeholderColor,
      hoverBg,
      hoverBorder,
      optionHoverBg,
      selectedBg,
      selectedActiveBg,
      optionActiveBg,
      dropdownColor,
      dropdownHoverColor,
      boxShadowLight,
      containerBg,
      containerBorder,
    }),
    [
      bgLight,
      borderLight,
      borderFocus,
      textColor,
      placeholderColor,
      hoverBg,
      hoverBorder,
      optionHoverBg,
      selectedBg,
      selectedActiveBg,
      optionActiveBg,
      dropdownColor,
      dropdownHoverColor,
      boxShadowLight,
      containerBg,
      containerBorder,
    ]
  );

  const selectStyles = useMemo<StylesConfig<DatePeriod>>(
    () => ({
      control: (provided, state) => ({
        ...provided,
        backgroundColor: colorValues.bgLight,
        borderColor: state.isFocused
          ? colorValues.borderFocus
          : colorValues.borderLight,
        borderWidth: 0,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: "0px",
        boxShadow: state.isFocused
          ? `0 0 0 1px ${colorValues.borderFocus}`
          : "none",
        height: "48px",
        minHeight: "48px",
        fontSize: "14px",
        cursor: "pointer",
        "&:hover": {
          borderColor: colorValues.hoverBorder,
          backgroundColor: colorValues.hoverBg,
        },
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: colorValues.bgLight,
        border: `1px solid ${colorValues.borderLight}`,
        borderRadius: "8px",
        boxShadow: colorValues.boxShadowLight,
        zIndex: 1001,
        marginTop: "4px",
        position: "absolute",
        width: "100%",
        minWidth: "200px",
        maxWidth: "400px",
        overflow: "hidden",
      }),
      menuList: (provided) => ({
        ...provided,
        maxHeight: "200px",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "4px",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? colorValues.selectedBg
          : state.isFocused
          ? colorValues.optionHoverBg
          : "transparent",
        color: state.isSelected ? "#fff" : colorValues.textColor,
        fontSize: "14px",
        padding: "12px 16px",
        borderRadius: "6px",
        margin: "2px 4px",
        cursor: "pointer",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        "&:active": {
          backgroundColor: state.isSelected
            ? colorValues.selectedActiveBg
            : colorValues.optionActiveBg,
        },
      }),
      singleValue: (provided) => ({
        ...provided,
        color: colorValues.textColor,
        fontSize: "14px",
        fontWeight: 500,
      }),
      placeholder: (provided) => ({
        ...provided,
        color: colorValues.placeholderColor,
        fontSize: "14px",
      }),
      dropdownIndicator: (provided, state) => ({
        ...provided,
        color: colorValues.dropdownColor,
        padding: "8px",
        transform: state.selectProps.menuIsOpen
          ? "rotate(180deg)"
          : "rotate(0deg)",
        transition: "transform 0.2s ease",
        "&:hover": {
          color: colorValues.dropdownHoverColor,
        },
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: colorValues.borderLight,
      }),
      valueContainer: (provided) => ({
        ...provided,
        padding: "0 16px",
      }),
      input: (provided) => ({
        ...provided,
        color: colorValues.textColor,
        margin: "0",
        paddingBottom: "0",
        paddingTop: "0",
      }),
    }),
    [colorValues]
  );

  const navigationState = useMemo(
    () => ({
      isPrevDisabled: currentIndex <= 0,
      isNextDisabled: currentIndex >= weeksOptions.length - 1,
    }),
    [currentIndex, weeksOptions.length]
  );

  return (
    <Box width="25vw" minWidth="300px" position="relative">
      <HStack
        spacing={0}
        bg={containerBg}
        rounded="xl"
        border="1px solid"
        borderColor={containerBorder}
      >
        <GenericIconButtonWithTooltip
          icon={<ChevronLeftIcon />}
          aria-label="Previous period"
          label="Previous period"
          onClick={handlePrevious}
          isDisabled={navigationState.isPrevDisabled}
          bg="blue.500"
          color="white"
          roundedLeft="xl"
          roundedRight="none"
          h="48px"
          w="48px"
          _hover={{ bg: "blue.600" }}
          _active={{ bg: "blue.700" }}
          _disabled={{ bg: "gray.400", cursor: "not-allowed" }}
        />

        <Box flex={1} position="relative" zIndex={1}>
          <Select
            value={selectedPeriod}
            onChange={handleSelectChange as any}
            options={weeksOptions}
            styles={selectStyles}
            placeholder="Select date period..."
            isSearchable={false}
            isClearable={false}
            isDisabled={false}
            closeMenuOnSelect={true}
            blurInputOnSelect={true}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </Box>

        <GenericIconButtonWithTooltip
          icon={<ChevronRightIcon />}
          label="Next period"
          aria-label="Next period"
          onClick={handleNext}
          isDisabled={navigationState.isNextDisabled}
          bg="blue.500"
          color="white"
          roundedLeft="none"
          roundedRight="xl"
          h="48px"
          w="48px"
          _hover={{ bg: "blue.600" }}
          _active={{ bg: "blue.700" }}
          _disabled={{ bg: "gray.400", cursor: "not-allowed" }}
        />
      </HStack>
    </Box>
  );
};

export default DatePeriodNavigator;
