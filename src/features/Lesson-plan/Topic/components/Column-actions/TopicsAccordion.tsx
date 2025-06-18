import React, { useState, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Container,
  Text,
  Center,
  Alert,
  SimpleGrid,
  Divider,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  Collapse,
  IconButton,
  Badge,
  Tooltip,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { FaChevronUp, FaChevronDown, FaBook, FaGraduationCap, FaBookOpen } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import GenericModal from "@components/ui/GenericModal";
import EditTopics from './EditTopics';
import { BaseCard } from '@components/shared/Cards/BaseCard';
import useDeleteTopicById from '../../hooks/useDeleteTopicById';
import { BaseHeader } from '@components/shared/Cards/BaseHeader';

interface Topic {
  id: number;
  description: string;
  sortedOrder: number;
}

export interface LessonItem {
  lessonId: number;
  lessonName: string;
  levelSubject: string;
  topics: Topic[];
}

interface Props {
  associationId: number;
  data: LessonItem[];
  searchTerm: string;
}

const TopicAccordion = ({ associationId, data, searchTerm }: Props) => {
  const { mutate: deleteTopic } = useDeleteTopicById();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTopicGroup, setSelectedTopicGroup] = useState<{
    lessonId: number;
    topics: Topic[];
    lessonName: string;
  } | null>(null);

  const handleEditTopics = (lessonId: number, currentTopics: Topic[], lessonName: string) => {
    setSelectedTopicGroup({
      lessonId,
      topics: currentTopics.map(topic => ({ ...topic })),
      lessonName,
    });
    setEditModalOpen(true);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
    if (!editModalOpen) setSelectedTopicGroup(null);
  };

  const handleDeleteTopic = (topicId: number) => {
    deleteTopic(topicId);
  };

  const normalize = (str: string) =>
    str.toLowerCase().trim().normalize('NFD').replace(/\u0300-\u036f/g, '');

  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) {
      return data
        .filter(lesson => lesson.topics?.length > 0)
        .map(lesson => ({
          ...lesson,
          topics: [...lesson.topics].sort((a, b) => a.sortedOrder - b.sortedOrder),
        }));
    }

    const normalizedSearch = normalize(searchTerm);
    return data
      .filter(lesson => lesson.topics?.length > 0)
      .filter(lesson =>
        normalize(lesson.lessonName).includes(normalizedSearch) ||
        normalize(lesson.levelSubject).includes(normalizedSearch)
      )
      .map(lesson => ({
        ...lesson,
        topics: [...lesson.topics].sort((a, b) => a.sortedOrder - b.sortedOrder),
      }));
  }, [data, searchTerm]);

  const groupedByLevelSubject = useMemo(() => {
    return filteredGroups.reduce((acc, lesson) => {
      if (!acc[lesson.levelSubject]) acc[lesson.levelSubject] = [];
      acc[lesson.levelSubject].push(lesson);
      return acc;
    }, {} as Record<string, LessonItem[]>);
  }, [filteredGroups]);

  if (data.length === 0) return <EmptyState />;

  return (
    <Container maxW="full" p={0}>
      <VStack spacing={8} align="stretch">
        {Object.entries(groupedByLevelSubject).map(([levelSubject, lessons]) => {
          const totalTopics = lessons.reduce((sum, lesson) => sum + lesson.topics.length, 0);
          return (
            <HStack key={levelSubject} align="stretch" spacing={6}>
              <LevelSidebar
                levelSubject={levelSubject}
                totalLessons={lessons.length}
                totalTopics={totalTopics}
              />
              <Box flex={1}>
                <VStack spacing={3} align="stretch">
                  {lessons.map(lesson => (
                    <LessonSection
                      key={lesson.lessonId}
                      lesson={lesson}
                      onEditTopics={handleEditTopics}
                      onDeleteTopic={handleDeleteTopic}
                      searchTerm={searchTerm}
                    />
                  ))}
                </VStack>
              </Box>
            </HStack>
          );
        })}
      </VStack>

      <GenericModal
        isOpen={editModalOpen}
        onClose={toggleEditModal}
        title={`Edit Topics - ${selectedTopicGroup?.lessonName ?? ''}`}
        size="lg"
      >
        {selectedTopicGroup && (
          <EditTopics
            details={{
              lessonId: selectedTopicGroup.lessonId,
              topics: selectedTopicGroup.topics,
              lessonName: selectedTopicGroup.lessonName,
            }}
            associationId={associationId}
            onClose={toggleEditModal}
            onSuccess={toggleEditModal}
          />
        )}
      </GenericModal>
    </Container>
  );
};

const LessonSection = ({
  lesson,
  onEditTopics,
  onDeleteTopic,
  searchTerm,
}: {
  lesson: LessonItem;
  onEditTopics: (lessonId: number, currentTopics: Topic[], lessonName: string) => void;
  onDeleteTopic: (topicId: number) => void;
  searchTerm: string;
}) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBorderColor = useColorModeValue('blue.300', 'blue.500');
  const iconColor = useColorModeValue('blue.600', 'blue.300');

  const handleEditTopicsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditTopics(lesson.lessonId, lesson.topics, lesson.lessonName);
  };

  const normalize = (str: string) => str.toLowerCase().trim().normalize('NFD').replace(/\u0300-\u036f/g, '');
  const isHighlighted = searchTerm.trim() &&
    (normalize(lesson.lessonName).includes(normalize(searchTerm)) ||
     normalize(lesson.levelSubject).includes(normalize(searchTerm)));

  return (
    <Card
      bg={bgColor}
      borderColor={isHighlighted ? hoverBorderColor : borderColor}
      borderWidth={isHighlighted ? "2px" : "1px"}
      shadow="sm"
      _hover={{ borderColor: hoverBorderColor, shadow: 'md' }}
      mb={3}
      borderRadius="lg"
    >
      <CardHeader>
        <Flex align="center" justify="space-between">
          <BaseHeader title={lesson.lessonName} icon={FaBook} iconColor={iconColor} size="md">
            <Badge
              bg={useColorModeValue('blue.100', 'blue.700')}
              color={useColorModeValue('blue.700', 'blue.200')}
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
              ml={2}
            >
              {lesson.topics.length}
            </Badge>
          </BaseHeader>
          <HStack spacing={3}>
            <Tooltip label="Edit topics">
              <IconButton
                aria-label="Edit topics"
                icon={<MdEdit />}
                size="sm"
                variant="ghost"
                color={useColorModeValue('gray.600', 'gray.300')}
                onClick={handleEditTopicsClick}
              />
            </Tooltip>
            <Tooltip label={isOpen ? "Collapse" : "Expand"}>
              <IconButton
                aria-label="Toggle section"
                icon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
                size="sm"
                variant="ghost"
                color={iconColor}
                onClick={onToggle}
              />
            </Tooltip>
          </HStack>
        </Flex>
      </CardHeader>
      <Collapse in={isOpen} animateOpacity>
        <CardBody pt={0}>
          <Divider mb={4} />
          <SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={3}>
            {lesson.topics.map((topic) => (
              <BaseCard
                key={topic.id}
                item={{
                  id: topic.id,
                  name: topic.description,
                }}
                deleteConfig={{
                  onDelete: () => onDeleteTopic(topic.id),
                  deleteTitle: "Delete topic",
                  deleteMessage: (name: string) => `Are you sure you want to delete "${name}"?`,
                  confirmText: "Yes, delete",
                  cancelText: "Cancel",
                  canDelete: true,
                }}
                cardConfig={{
                  color: 'green',
                  showCode: false,
                  onClick: () => console.log("Clicked topic:", topic.description),
                }}
              />
            ))}
          </SimpleGrid>
        </CardBody>
      </Collapse>
    </Card>
  );
};

const LevelSidebar = ({ levelSubject, totalLessons, totalTopics }: {
  levelSubject: string;
  totalLessons: number;
  totalTopics: number;
}) => {
  const borderColor = useColorModeValue('blue.200', 'blue.600');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const statsBg = useColorModeValue('white', 'gray.700');

  return (
    <Box
      w="200px"
      bg={statsBg}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      p={6}
      position="sticky"
      top={4}
      flexShrink={0}
    >
      <VStack spacing={6}>
        <VStack spacing={3}>
          <Center
            w={14}
            h={14}
            bg={useColorModeValue('blue.100', 'blue.700')}
            borderRadius="full"
            color={useColorModeValue('blue.600', 'blue.300')}
          >
            <FaGraduationCap size={24} />
          </Center>
          <Text fontSize="sm" fontWeight="700" color={textColor} textAlign="center">
            {levelSubject}
          </Text>
        </VStack>

        <Box
          w="full"
          bg={statsBg}
          borderRadius="md"
          p={4}
          border="1px solid"
          borderColor={borderColor}
        >
          <VStack spacing={3}>
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="700" color={useColorModeValue('blue.600', 'blue.400')}>
                {totalLessons}
              </Text>
              <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                Lesson{totalLessons > 1 ? 's' : ''}
              </Text>
            </VStack>

            <Divider borderColor={borderColor} />

            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="700" color={useColorModeValue('blue.600', 'blue.400')}>
                {totalTopics}
              </Text>
              <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                Topic{totalTopics > 1 ? 's' : ''}
              </Text>
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

const EmptyState = () => (
  <Container maxW="full" p={0}>
    <Alert
      status="info"
      borderRadius="lg"
      p={8}
      flexDirection="column"
      alignItems="center"
      textAlign="center"
    >
      <Center mb={4}>
        <FaBookOpen size={48} />
      </Center>
      <Text fontSize="lg" fontWeight="600" mb={2}>
        No topics available
      </Text>
      <Text color={useColorModeValue('blue.600', 'blue.400')}>
        No content available for this association.
      </Text>
    </Alert>
  </Container>
);

export default TopicAccordion;