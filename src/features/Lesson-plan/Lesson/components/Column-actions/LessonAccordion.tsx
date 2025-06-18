import React, { useState, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Container,
  Text,
  Center,
  Spinner,
  Alert,
  AlertIcon,
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
import EditLessons from './EditLessons';
import { BaseCard } from '@components/shared/Cards/BaseCard';
import { BaseHeader } from '@components/shared/Cards/BaseHeader';
import useDeleteLessonById from '../../hooks/useDeleteLessonById';

interface Lesson {
  id: number;
  name: string;
  sortedOrder: number;
}

interface LessonLevelItem {
  levelSubjectId: number;
  level: string;
  subject: string;
  lessons: Lesson[];
}

interface Props {
  associationId: number;
  data: LessonLevelItem[];
  searchTerm: string;
}

const LessonAccordion = ({ associationId, data, searchTerm }: Props) => {
  const { mutate: deleteLesson } = useDeleteLessonById(associationId);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLessonGroup, setSelectedLessonGroup] = useState<{
    levelSubjectId: number;
    lessons: Lesson[];
    subjectName: string;
  } | null>(null);

  const handleEditLessons = (levelSubjectId: number, currentLessons: Lesson[], subjectName: string) => {
    setSelectedLessonGroup({ levelSubjectId, lessons: currentLessons, subjectName });
    setEditModalOpen(true);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
    if (!editModalOpen) setSelectedLessonGroup(null);
  };

  const handleDeleteLesson = (lessonId: number) => {
    deleteLesson(lessonId);
  };

  const normalize = (str: string) => 
    str.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) {
      return data
        .filter(group => group.lessons?.length > 0)
        .map(group => ({
          ...group,
          lessons: [...group.lessons].sort((a, b) => a.sortedOrder - b.sortedOrder)
        }));
    }

    const normalizedSearch = normalize(searchTerm);
    return data
      .filter(group => group.lessons?.length > 0)
      .filter(group => 
        normalize(group.subject).includes(normalizedSearch) || 
        normalize(group.level).includes(normalizedSearch)
      )
      .map(group => ({
        ...group,
        lessons: [...group.lessons].sort((a, b) => a.sortedOrder - b.sortedOrder)
      }));
  }, [data, searchTerm]);

  const groupedByLevel = useMemo(() => {
    return filteredGroups.reduce((acc, group) => {
      if (!acc[group.level]) acc[group.level] = [];
      acc[group.level].push(group);
      return acc;
    }, {} as Record<string, LessonLevelItem[]>);
  }, [filteredGroups]);

  if (data.length === 0) return <EmptyState />;

  return (
    <Container maxW="full" p={0}>
      <VStack spacing={8} align="stretch">
        {Object.entries(groupedByLevel).map(([level, groups]) => {
          const totalLessons = groups.reduce((sum, group) => sum + group.lessons.length, 0);
          return (
            <HStack key={level} align="stretch" spacing={6}>
              <LevelSidebar level={level} totalSubjects={groups.length} totalLessons={totalLessons} />
              <Box flex={1}>
                <VStack spacing={3} align="stretch">
                  {groups.map(group => (
                    <SubjectSection
                      key={group.levelSubjectId}
                      group={group}
                      onEditLessons={handleEditLessons}
                      onDeleteLesson={handleDeleteLesson}
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
        title={`Edit Lessons - ${selectedLessonGroup?.subjectName ?? ''}`}
        size="lg"
      >
        {selectedLessonGroup && (
          <EditLessons
            details={{
              levelSubjectId: selectedLessonGroup.levelSubjectId,
              lessons: selectedLessonGroup.lessons,
              subjectName: selectedLessonGroup.subjectName
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

const SubjectSection = ({ 
  group, 
  onEditLessons,
  onDeleteLesson,
  searchTerm 
}: { 
  group: LessonLevelItem;
  onEditLessons: (levelSubjectId: number, currentLessons: Lesson[], subjectName: string) => void;
  onDeleteLesson: (lessonId: number) => void;
  searchTerm: string;
}) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBorderColor = useColorModeValue('blue.300', 'blue.500');
  const iconColor = useColorModeValue('blue.600', 'blue.300');

  const handleEditLessons = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditLessons(group.levelSubjectId, group.lessons, group.subject);
  };

  const normalize = (str: string) => 
    str.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  const isHighlighted = searchTerm.trim() && 
    (normalize(group.subject).includes(normalize(searchTerm)) || 
     normalize(group.level).includes(normalize(searchTerm)));

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
          <BaseHeader 
            title={group.subject}
            icon={FaBook}
            iconColor={iconColor}
            size="md"
          >
            <Badge 
              bg={useColorModeValue('blue.100', 'blue.700')}
              color={useColorModeValue('blue.700', 'blue.200')}
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
              ml={2}
            >
              {group.lessons.length}
            </Badge>
          </BaseHeader>
          
          <HStack spacing={3}>
            <Tooltip label="Edit lessons">
              <IconButton
                aria-label="Edit lessons"
                icon={<MdEdit />}
                size="sm"
                variant="ghost"
                color={useColorModeValue('gray.600', 'gray.300')}
                onClick={handleEditLessons}
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
            {group.lessons.map((lesson) => (
              <BaseCard
                key={lesson.id}
                item={lesson}
                deleteConfig={{
                  onDelete: (lessonId) => onDeleteLesson(lessonId),
                  deleteTitle: "Delete lesson",
                  deleteMessage: (name: string) => `Are you sure you want to delete "${name}"?`,
                  confirmText: "Yes, delete",
                  cancelText: "Cancel",
                  canDelete: true,
                }}
                cardConfig={{
                  color: 'blue',
                  showCode: false,
                  onClick: () => console.log("Clicked lesson:", lesson.name)
                }}
              />
            ))}
          </SimpleGrid>
        </CardBody>
      </Collapse>
    </Card>
  );
};

const LevelSidebar = ({ 
  level, 
  totalSubjects, 
  totalLessons 
}: { 
  level: string;
  totalSubjects: number;
  totalLessons: number;
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
          
          <Text fontSize="xl" fontWeight="700" color={textColor}>
            {level}
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
                {totalSubjects}
              </Text>
              <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                Subject{totalSubjects > 1 ? 's' : ''}
              </Text>
            </VStack>
            
            <Divider borderColor={borderColor} />
            
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="700" color={useColorModeValue('blue.600', 'blue.400')}>
                {totalLessons}
              </Text>
              <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                Lesson{totalLessons > 1 ? 's' : ''}
              </Text>
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

const LoadingState = () => (
  <Container maxW="full" p={0}>
    <Center minH="400px">
      <VStack spacing={6}>
        <Spinner size="xl" color={useColorModeValue('blue.600', 'blue.300')} />
        <Text fontSize="lg" fontWeight="600" color={useColorModeValue('gray.700', 'gray.200')}>
          Loading lessons...
        </Text>
      </VStack>
    </Center>
  </Container>
);

const ErrorState = () => (
  <Container maxW="full" p={0}>
    <Alert 
      status="error" 
      borderRadius="lg" 
      p={6}
      flexDirection="column"
      alignItems="center"
      textAlign="center"
    >
      <AlertIcon boxSize="40px" mb={4} />
      <Text fontSize="lg" fontWeight="600" mb={2}>
        Loading error
      </Text>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>
        Unable to load lessons. Please try again later.
      </Text>
    </Alert>
  </Container>
);

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
        No lessons available
      </Text>
      <Text color={useColorModeValue('blue.600', 'blue.400')}>
        No content available for this association.
      </Text>
    </Alert>
  </Container>
);

export default LessonAccordion;