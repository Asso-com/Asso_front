import Select from "react-select";

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: string[];
  bg?: string;
  optionFormatter?: (option: string) => string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  placeholder,
  options,
  optionFormatter,
}) => {
  const formattedOptions = options.map((opt) => ({
    value: opt,
    label: optionFormatter ? optionFormatter(opt) : opt,
  }));

  const selectedOption =
    formattedOptions.find((opt) => opt.value === value) || null;

  return (
    <Select
      value={selectedOption}
      onChange={(option) => {
        onChange(option ? option.value : "");
      }}
      options={formattedOptions}
      placeholder={placeholder}
      isClearable
      styles={{
        container: (base) => ({
          ...base,
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
        }),
      }}
    />
  );
};

export default FilterSelect;
