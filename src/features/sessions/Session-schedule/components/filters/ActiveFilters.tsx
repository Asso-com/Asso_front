import { Wrap, WrapItem, Badge } from "@chakra-ui/react";

interface ActiveFiltersProps {
  selectedDay: string;
  selectedLevel: string;
  selectedSubject: string;
  selectedStaff: string;
  selectedStatus: string;
  dayNames: Record<string, string>;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedDay,
  selectedLevel,
  selectedSubject,
  selectedStaff,
  selectedStatus,
  dayNames,
}) => {
  const getStatusLabel = (status: string) => {
    const statusLabels: Record<string, string> = {
      pending: "Pending",
      attendance_taken: "Attendance Taken",
      validated: "Validated",
      canceled: "Canceled",
    };
    return statusLabels[status] || status;
  };

  return (
    <Wrap>
      {selectedDay && (
        <WrapItem>
          <Badge colorScheme="green" px={3} py={1} borderRadius="full">
            {dayNames[selectedDay] || selectedDay}
          </Badge>
        </WrapItem>
      )}

      {selectedLevel && (
        <WrapItem>
          <Badge colorScheme="cyan" px={3} py={1} borderRadius="full">
            {selectedLevel}
          </Badge>
        </WrapItem>
      )}

      {selectedSubject && (
        <WrapItem>
          <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
            {selectedSubject}
          </Badge>
        </WrapItem>
      )}

      {selectedStaff && (
        <WrapItem>
          <Badge colorScheme="orange" px={3} py={1} borderRadius="full">
            {selectedStaff}
          </Badge>
        </WrapItem>
      )}

      {selectedStatus && (
        <WrapItem>
          <Badge colorScheme="teal" px={3} py={1} borderRadius="full">
            {getStatusLabel(selectedStatus)}
          </Badge>
        </WrapItem>
      )}
    </Wrap>
  );
};

export default ActiveFilters;
