import useFetchActivePeriod from "@features/system-settings/school-year-settings/hooks/useFetchActivePeriod";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import {
  Badge,
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { formatDateOnly } from "@utils/timeUtils";

const ActivePeriod = () => {
  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data } = useFetchActivePeriod(associationId);

  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const subtitleColor = useColorModeValue("gray.500", "gray.400");

  if (!data) return null;

  return (
    <Tooltip
      label={
        <Box p={3} maxW="250px">
          <Text fontWeight="semibold" fontSize="md" mb={1}>
            {data.description}
          </Text>
          <Text fontSize="sm" color={subtitleColor}>
            {formatDateOnly(data.startDate, {
              format: "medium",
            })}
            -{" "}
            {formatDateOnly(data.endDate, {
              format: "medium",
            })}
          </Text>
          <HStack mt={2} spacing={3}>
            <Badge
              colorScheme={data.active ? "green" : "gray"}
              borderRadius="full"
            >
              {data.active ? "Active" : "Inactive"}
            </Badge>
            <Badge colorScheme="blue" borderRadius="full">
              {data.dayOfWeek}
            </Badge>
          </HStack>
        </Box>
      }
      placement="bottom-start"
      hasArrow
      borderRadius="md"
    >
      <HStack
        spacing={2}
        px={4}
        py={1}
        borderRadius="lg"
        bg={bgColor}
        border="1px"
        borderColor={borderColor}
        _hover={{ bg: hoverBg }}
        transition="all 0.2s"
        boxShadow="md"
        cursor="pointer"
        align="center"
      >
        <Icon as={FiCalendar} boxSize={5} color="green.400" />
        <Stack spacing={0}>
          <Text fontSize="sm" fontWeight="semibold" color={textColor}>
            Active Period
          </Text>
          <HStack spacing={1} align="center">
            <Icon as={FiClock} boxSize={3.5} color={subtitleColor} />
            <Text fontSize="xs" color={subtitleColor}>
              {data.code} • {data.numberOfWeeks} weeks
            </Text>
          </HStack>
        </Stack>
      </HStack>
    </Tooltip>
  );
};

export default ActivePeriod;
