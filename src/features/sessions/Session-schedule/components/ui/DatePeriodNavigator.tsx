import { useState } from "react";
import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Select, { type SingleValue, type StylesConfig } from "react-select";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";

interface DatePeriod {
  value: string;
  label: string;
}

// Static Options
const datePeriods: DatePeriod[] = [
  {
    value: "2024-06-23_2024-06-29",
    label: "Date From: 23 Jun. 2024 Date To: 29 Jun. 2024",
  },
  {
    value: "2024-06-16_2024-06-22",
    label: "Date From: 16 Jun. 2024 Date To: 22 Jun. 2024",
  },
  {
    value: "2024-06-09_2024-06-15",
    label: "Date From: 09 Jun. 2024 Date To: 15 Jun. 2024",
  },
  {
    value: "2024-06-02_2024-06-08",
    label: "Date From: 02 Jun. 2024 Date To: 08 Jun. 2024",
  },
  {
    value: "2024-05-26_2024-06-01",
    label: "Date From: 26 May. 2024 Date To: 01 Jun. 2024",
  },
  {
    value: "2024-05-19_2024-05-25",
    label: "Date From: 19 May. 2024 Date To: 25 May. 2024",
  },
  {
    value: "2024-05-12_2024-05-18",
    label: "Date From: 12 May. 2024 Date To: 18 May. 2024",
  },
  {
    value: "2024-05-05_2024-05-11",
    label: "Date From: 05 May. 2024 Date To: 11 May. 2024",
  },
  {
    value: "2024-04-28_2024-05-04",
    label: "Date From: 28 Apr. 2024 Date To: 04 May. 2024",
  },
  {
    value: "2024-04-21_2024-04-27",
    label: "Date From: 21 Apr. 2024 Date To: 27 Apr. 2024",
  },
];

const DatePeriodNavigator = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = useState<DatePeriod>(
    datePeriods[0]
  );

  const handlePrevious = () => {
    if (currentIndex < datePeriods.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedPeriod(datePeriods[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedPeriod(datePeriods[newIndex]);
    }
  };

  const handleSelectChange = (option: SingleValue<DatePeriod>) => {
    if (option) {
      const index = datePeriods.findIndex(
        (item) => item.value === option.value
      );
      setSelectedPeriod(option);
      setCurrentIndex(index);
    }
  };

  const selectStyles: StylesConfig<DatePeriod> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: useColorModeValue("#fff", "#2D3748"),
      borderColor: state.isFocused
        ? useColorModeValue("#3182ce", "#63B3ED")
        : useColorModeValue("#E2E8F0", "#4A5568"),
      borderWidth: 0,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderRadius: "0px",
      boxShadow: state.isFocused
        ? `0 0 0 1px ${useColorModeValue("#3182ce", "#63B3ED")}`
        : "none",
      height: "48px",
      fontSize: "14px",
      color: useColorModeValue("#2D3748", "#F7FAFC"),
      "&:hover": {
        borderColor: useColorModeValue("#CBD5E0", "#718096"),
        backgroundColor: useColorModeValue("#F7FAFC", "#4A5568"),
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: useColorModeValue("#fff", "#2D3748"),
      border: `1px solid ${useColorModeValue("#E2E8F0", "#4A5568")}`,
      borderRadius: "8px",
      boxShadow: useColorModeValue(
        "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
      ),
      zIndex: 1000,
      marginTop: "4px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? useColorModeValue("#3182ce", "#63B3ED")
        : state.isFocused
        ? useColorModeValue("#EBF8FF", "#2A4365")
        : "transparent",
      color: state.isSelected
        ? "#fff"
        : useColorModeValue("#2D3748", "#F7FAFC"),
      fontSize: "14px",
      padding: "12px 16px",
      borderRadius: "6px",
      margin: "2px 0",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: useColorModeValue("#2D3748", "#F7FAFC"),
      fontSize: "14px",
      fontWeight: 500,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: useColorModeValue("#A0AEC0", "#718096"),
      fontSize: "14px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: useColorModeValue("#718096", "#A0AEC0"),
      padding: "8px",
      transform: state.selectProps.menuIsOpen
        ? "rotate(180deg)"
        : "rotate(0deg)",
      transition: "transform 0.2s",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: useColorModeValue("#E2E8F0", "#4A5568"),
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 16px",
    }),
    input: (provided) => ({
      ...provided,
      color: useColorModeValue("#2D3748", "#F7FAFC"),
    }),
  };

  return (
    <Box width="auto">
      <HStack
        spacing={0}
        bg={useColorModeValue("gray.50", "gray.700")}
        rounded="xl"
        overflow="hidden"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
      >
        <GenericIconButtonWithTooltip
          icon={<ChevronLeftIcon />}
          aria-label="Previous period"
          label="Previous period"
          onClick={handlePrevious}
          isDisabled={currentIndex >= datePeriods.length - 1}
          bg="blue.500"
          color="white"
          rounded="none"
          h="48px"
          w="48px"
          _hover={{ bg: "blue.600" }}
          _active={{ bg: "blue.700" }}
          _disabled={{ bg: "gray.400", cursor: "not-allowed" }}
        />

        {/* Date Period Select */}
        <Box flex={1}>
          <Select
            value={selectedPeriod}
            onChange={handleSelectChange as any}
            options={datePeriods}
            styles={selectStyles}
            placeholder="Select date period..."
            isSearchable={false}
            components={{ IndicatorSeparator: () => null }}
          />
        </Box>

        <GenericIconButtonWithTooltip
          icon={<ChevronRightIcon />}
          label="Next period"
          aria-label="Next period"
          onClick={handleNext}
          isDisabled={currentIndex <= 0}
          bg="blue.500"
          color="white"
          rounded="none"
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
