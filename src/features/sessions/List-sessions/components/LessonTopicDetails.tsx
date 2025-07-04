import React from "react";
import {
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  Box,
  Badge,
  HStack,
  Flex,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { FiBookOpen, FiTarget } from "react-icons/fi";
import useFetchLessonTopics from "../hooks/useFetchLessonTopics"; 

interface LessonTopicDetailsProps {
  sessionId: number;
}

const LessonTopicDetails: React.FC<LessonTopicDetailsProps> = ({ sessionId }) => {
  const { data, isLoading, error } = useFetchLessonTopics(sessionId);

  if (isLoading) {
    return (
      <Container maxW="4xl" py={8} textAlign="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Container maxW="4xl" py={8}>
        <Card shadow="lg" borderRadius="xl" bg="gray.50">
          <CardBody>
            <Text color="gray.500" fontSize="lg" textAlign="center" py={8}>
              No lesson plan available for this session.
            </Text>
          </CardBody>
        </Card>
      </Container>
    );
  }

  // Calculate total topics
  const totalTopics = data.reduce((sum, lesson) => sum + lesson.topics.length, 0);

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Summary */}
        <Card borderRadius="xl" bg="white" border="1px solid" borderColor="gray.200" px={6} py={4}>
          <CardBody p={0}>
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
              <Box>
                <Heading size="md" color="gray.800">
                  Session {sessionId}
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  Detailed lesson plan
                </Text>
              </Box>
              <HStack spacing={6}>
                <HStack spacing={3}>
                  <Box bg="blue.50" p={2} borderRadius="full">
                    <FiBookOpen size={18} color="#6B46C1" />
                  </Box>
                  <VStack spacing={0} align="start">
                    <Text fontSize="lg" fontWeight="bold" color="gray.800">
                      {data.length}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Lessons
                    </Text>
                  </VStack>
                </HStack>
                <HStack spacing={3}>
                  <Box bg="blue.50" p={2} borderRadius="full">
                    <FiTarget size={18} color="#3182CE" />
                  </Box>
                  <VStack spacing={0} align="start">
                    <Text fontSize="lg" fontWeight="bold" color="gray.800">
                      {totalTopics}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Topics
                    </Text>
                  </VStack>
                </HStack>
              </HStack>
            </Flex>
          </CardBody>
        </Card>

        {/* Lessons */}
        {data.map((lesson, lessonIndex) => (
          <Card
            key={lesson.lessonId}
            borderRadius="xl"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            _hover={{ bg: "gray.50", borderColor: "blue.400" }}
          >
            <CardBody p={5}>
              <HStack justify="space-between" mb={4}>
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="medium" color="blue.600">
                    Lesson {lesson.lessonOrder}
                  </Text>
                  <Heading size="md" color="gray.800">
                    {lesson.lessonName}
                  </Heading>
                </VStack>
                <Badge variant="subtle" colorScheme="blue">
                  {lesson.topics.length} topics
                </Badge>
              </HStack>

              <VStack align="stretch" spacing={3}>
                {lesson.topics.map((topic, topicIndex) => (
                  <HStack
                    key={topic.topicId}
                    p={3}
                    bg="gray.50"
                    borderRadius="md"
                    borderLeft="4px solid"
                    borderLeftColor={
                      lessonIndex === 0 && topicIndex === 0 ? "blue.400" : "blue.300"
                    }
                    _hover={{ bg: "blue.50" }}
                  >
                    <Text
                      fontWeight="bold"
                      fontSize="sm"
                      color="blue.600"
                      minW="30px"
                      textAlign="center"
                    >
                      {topic.topicOrder}
                    </Text>
                    <Text flex={1} color="gray.700">
                      {topic.description}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Container>
  );
};

export default LessonTopicDetails;
