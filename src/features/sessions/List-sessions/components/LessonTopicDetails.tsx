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
} from "@chakra-ui/react";
import { FiBookOpen, FiTarget } from "react-icons/fi";

// Types
export interface TopicDto {
  topicId: number;
  description: string;
  topicOrder: number;
}

export interface LessonWithTopicsDto {
  lessonId: number;
  lessonName: string;
  lessonOrder: number;
  topics: TopicDto[];
}

// Fake data
const fakeLessonsData: LessonWithTopicsDto[] = [
  {
    lessonId: 1,
    lessonName: "Introduction to Databases",
    lessonOrder: 1,
    topics: [
      { topicId: 1, description: "What is a database?", topicOrder: 1 },
      { topicId: 2, description: "Types of databases (Relational, NoSQL)", topicOrder: 2 },
      { topicId: 3, description: "Advantages and Disadvantages", topicOrder: 3 },
    ],
  },
  {
    lessonId: 2,
    lessonName: "Data Modeling",
    lessonOrder: 2,
    topics: [
      { topicId: 4, description: "Basic concepts: entities, attributes, relationships", topicOrder: 1 },
      { topicId: 5, description: "Entity-Relationship Diagrams (ERD)", topicOrder: 2 },
      { topicId: 6, description: "Data normalization", topicOrder: 3 },
      { topicId: 7, description: "Primary and foreign keys", topicOrder: 4 },
    ],
  },
  {
    lessonId: 3,
    lessonName: "SQL - Structured Query Language",
    lessonOrder: 3,
    topics: [
      { topicId: 8, description: "Basic SQL syntax", topicOrder: 1 },
      { topicId: 9, description: "SELECT, INSERT, UPDATE, DELETE statements", topicOrder: 2 },
      { topicId: 10, description: "Joins and subqueries", topicOrder: 3 },
    ],
  },
  {
    lessonId: 4,
    lessonName: "Administration and Security",
    lessonOrder: 4,
    topics: [
      { topicId: 11, description: "User and permission management", topicOrder: 1 },
      { topicId: 12, description: "Backup and restore", topicOrder: 2 },
      { topicId: 13, description: "Data security", topicOrder: 3 },
    ],
  },
];

interface LessonTopicDetailsProps {
  sessionId: number;
}

const LessonTopicDetails: React.FC<LessonTopicDetailsProps> = ({ sessionId }) => {
  const data = fakeLessonsData;
  const totalTopics = data.reduce((sum, lesson) => sum + lesson.topics.length, 0);

  if (!data.length) {
    return (
      <Container maxW="4xl" py={8}>
        <Card shadow="lg" borderRadius="xl" bg="gray.50">
          <CardBody>
            <Text color="gray.500" fontSize="lg" textAlign="center" py={8}>
              No Lesson plan available for this session.
            </Text>
          </CardBody>
        </Card>
      </Container>
    );
  }

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
                  Detailed Lesson plan
                </Text>
              </Box>
              <HStack spacing={6}>
                <HStack spacing={3}>
                  <Box bg="blue.50" p={2} borderRadius="full">
                    <FiBookOpen size={18} color="#6B46C1" />
                  </Box>
                  <VStack spacing={0} align="start">
                    <Text fontSize="lg" fontWeight="bold" color="gray.800">{data.length}</Text>
                    <Text fontSize="xs" color="gray.500">Lessons</Text>
                  </VStack>
                </HStack>
                <HStack spacing={3}>
                  <Box bg="blue.50" p={2} borderRadius="full">
                    <FiTarget size={18} color="#3182CE" />
                  </Box>
                  <VStack spacing={0} align="start">
                    <Text fontSize="lg" fontWeight="bold" color="gray.800">{totalTopics}</Text>
                    <Text fontSize="xs" color="gray.500">Topics</Text>
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
                  <Heading size="md" color="gray.800">{lesson.lessonName}</Heading>
                </VStack>
                <Badge variant="subtle" colorScheme="blue">
                  {lesson.topics.length} Topics
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
                    borderLeftColor={lessonIndex === 0 && topicIndex === 0 ? "blue.400" : "blue.300"}
                    _hover={{ bg: "blue.50" }}
                  >
                    <Text fontWeight="bold" fontSize="sm" color="blue.600" minW="30px" textAlign="center">
                      {topic.topicOrder}
                    </Text>
                    <Text flex={1} color="gray.700">{topic.description}</Text>
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
