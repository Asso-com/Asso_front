import type { ProcessedStudentData } from "../Types/StudentLocationType";
import { Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";

const StudentCard = ({ student }: { student: ProcessedStudentData }) => {
  return (
    <Card
      bg={"white"}
      boxShadow="sm"
      borderWidth="1px"
      borderColor={"gray.100"}
      borderLeftWidth={"1px"}
      borderLeftColor={"gray.100"}
      borderRadius="md"
      _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
      cursor="pointer"
    >
      <CardBody p={3}>
        <Flex align="center" mb={2}>
          <Text fontSize="lg" mr={3} color="blue.500">
            👨‍🎓
          </Text>
          <Box flex="1">
            <Text fontWeight="semibold" fontSize="sm" noOfLines={1}>
              {student.name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              🆔 {student.registrationId}
            </Text>
          </Box>
        </Flex>
        <Text fontSize="xs" color="gray.600" mb={1} noOfLines={1}>
          📧 {student.email}
        </Text>
      </CardBody>
    </Card>
  );
};
export default StudentCard;
