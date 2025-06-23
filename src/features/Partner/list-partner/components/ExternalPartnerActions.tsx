import {
  Flex,
  HStack,
  Icon,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { FaHandshake, FaSearch } from "react-icons/fa";
import { useState } from "react";

interface ExternalPartnerActionsProps {
  totalCount: number;
  onSearchChange?: (search: string) => void;
}

const ExternalPartnerActions: React.FC<ExternalPartnerActionsProps> = ({
  totalCount,
  onSearchChange,
}) => {
  const [searchText, setSearchText] = useState("");
  
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearchChange?.(value);
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      gap={4}
      p={4}
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      shadow="sm"
    >
      <HStack spacing={3}>
        <Icon as={FaHandshake} boxSize={5} color="blue.500" />
        <Text fontSize="lg" fontWeight="bold" color="blue.600">
          External Partners List
        </Text>
        <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
          {totalCount.toLocaleString()} partners
        </Badge>
      </HStack>

      <InputGroup maxW="300px">
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search partners..."
          value={searchText}
          onChange={handleSearchChange}
          size="md"
        />
      </InputGroup>
    </Flex>
  );
};

export default ExternalPartnerActions;