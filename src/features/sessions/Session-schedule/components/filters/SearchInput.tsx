import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  bg?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  bg,
}) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon as={FiSearch} color="gray.400" />
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        bg={bg}
        borderRadius="lg"
      />
    </InputGroup>
  );
};

export default SearchInput;
