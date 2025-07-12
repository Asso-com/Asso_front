import Select from "react-select";

type Option = { label: string; value: string | number };

interface MultiSelectDropdownProps {
  label: string;
  value: (string | number)[];
  options: Option[];
  onChange: (selected: (string | number)[]) => void;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;  // ajouté pour gérer la désactivation
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder,
  isInvalid,
  errorMessage,
  isDisabled = false,
}) => {
  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  return (
    <div>
      <label style={{ display: "block", marginBottom: 4 }}>{label}</label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={(selected) => {
          onChange(selected ? selected.map((opt) => opt.value) : []);
        }}
        placeholder={placeholder}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: isInvalid ? "red" : base.borderColor,
          }),
        }}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuPlacement="auto"
        isDisabled={isDisabled}
      />
      {isInvalid && errorMessage && (
        <div style={{ color: "red", marginTop: 4 }}>{errorMessage}</div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
