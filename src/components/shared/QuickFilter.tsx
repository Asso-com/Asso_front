import { useCallback, useRef } from "react"
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react"
import { FaSearch, FaTimes } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import type { AgGridReact } from "ag-grid-react"

// Define props interface
interface QuickFilterProps {
  gridRef: React.RefObject<AgGridReact>
  placeholder?: string
}

const QuickFilter: React.FC<QuickFilterProps> = ({
  gridRef,
  placeholder = "Search here",
}) => {
  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const onFilterTextBoxChanged = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.setGridOption(
        "quickFilterText",
        inputRef.current?.value
      )
    }
  }, [gridRef])

  const handleClearIconClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
      onFilterTextBoxChanged()
    }
  }

  const inputBg = useColorModeValue("white", "gray.700")
  const inputHoverBg = useColorModeValue("gray.50", "gray.600")
  const inputFocusShadow = useColorModeValue(
    "0 0 0 2px rgba(66, 153, 225, 0.6)",
    "0 0 0 2px rgba(66, 153, 225, 0.4)"
  )

  return (
    <Flex w="100%" justify="center" px={4}>
      <Box w={{ base: "100%", sm: "300px", md: "25vw" }}>
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.400" boxSize={4} />
          </InputLeftElement>
          <Input
            ref={inputRef}
            type="text"
            placeholder={t(placeholder)}
            onChange={onFilterTextBoxChanged}
            fontSize="sm"
            bg={inputBg}
            _hover={{ bg: inputHoverBg }}
            _focus={{
              bg: inputHoverBg,
              boxShadow: inputFocusShadow,
              borderColor: "blue.400",
            }}
            pl="40px"
            pr="40px"
            borderRadius="full"
            transition="all 0.2s ease-in-out"
          />
          <InputRightElement>
            <Icon
              as={FaTimes}
              color="gray.500"
              cursor="pointer"
              _hover={{
                color: "red.500",
                transform: "scale(1.2)",
              }}
              transition="all 0.2s ease"
              onClick={handleClearIconClick}
              boxSize={4}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  )
}

export default QuickFilter
