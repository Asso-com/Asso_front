import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import StudentLocationList from "./components/FilterPanel";
import useFilters from "./Hooks/useFilters";

import type { StudentResponse } from "./Types/StudentLocationType";
import StudentMap from "./components/StudentMap";

interface LocationStudentPresenterProps {
  students: StudentResponse[];
}

const LocationStudentPresenter: React.FC<LocationStudentPresenterProps> = ({
  students,
}) => {
  const {
    filteredStudents,
    enrollmentFilter,
    qpvFilter,
    setEnrollmentFilter,
    setQpvFilter,
    resetFilters,
  } = useFilters(students);

  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Flex height="100%" position="relative">
      <Box
        position="absolute"
        top="0"
        left="0"
        height="100%"
        width="350px"
        bg="gray.50"
        borderRight="1px solid"
        borderColor="gray.200"
        boxShadow="lg"
        zIndex={10}
        transform={isOpen ? "translateX(0)" : "translateX(-100%)"}
        transition="transform 0.3s ease-in-out"
        overflowY="auto"
      >
        <StudentLocationList
          allStudents={filteredStudents}
          enrollmentFilter={enrollmentFilter}
          qpvFilter={qpvFilter}
          setEnrollmentFilter={setEnrollmentFilter}
          setQpvFilter={setQpvFilter}
          resetFilters={resetFilters}
        />
      </Box>

      <Box
        position="absolute"
        bottom="20px"
        left={isOpen ? "360px" : "10px"}
        zIndex={20}
        transition="left 0.3s ease-in-out"
      >
        <Flex
          bg="blue.500"
          color="white"
          px={4}
          py={2}
          borderRadius="full"
          boxShadow="lg"
          alignItems="center"
          cursor="pointer"
          onClick={onToggle}
          _hover={{
            bg: "blue.600",
            transform: "scale(1.05)",
          }}
          _active={{
            transform: "scale(0.95)",
          }}
          transition="all 0.2s ease-in-out"
        >
          {isOpen ? <ChevronLeftIcon mr={2} /> : <ChevronRightIcon mr={2} />}
          <Box fontSize="sm" fontWeight="medium">
            {isOpen ? "Hide List" : "Show List"}
          </Box>
        </Flex>
      </Box>

      <Box
        flex="1"
        marginLeft={isOpen ? "350px" : "0px"}
        transition="margin-left 0.3s ease-in-out"
      >
        <StudentMap filteredStudents={filteredStudents} />
      </Box>
    </Flex>
  );
};

export default LocationStudentPresenter;
