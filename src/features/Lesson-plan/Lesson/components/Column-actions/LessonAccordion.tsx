import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Container,
  useColorModeValue,
  Flex,
  VStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Badge,
  HStack,
  Collapse,
  IconButton,
  Divider,
  useDisclosure,
  Tooltip,
  Card,
  CardBody,
  CardHeader,
  Center,
} from '@chakra-ui/react';
import {
  FaChevronUp, 
  FaChevronDown, 
  FaBook, 
  FaGraduationCap,
  FaBookOpen 
} from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { BaseCard } from '@components/shared/Cards/BaseCard';
import { BaseHeader } from '@components/shared/Cards/BaseHeader';
import GenericModal from "@components/ui/GenericModal";
import EditLessons from './EditLessons';
import useFetchLessonsByAssociation from '../../hooks/useFetchLessons';
import useDeleteLessonById from '../../hooks/useDeleteLessonById';

interface Lesson {
  id: number;
  name: string;
  sortedOrder: number;
}

interface LessonGroup {
  levelSubjectId: number;
  level: string;
  subject: string;
  lessons: Lesson[];
}

interface Props {
  associationId: number;
}

const SubjectSection = ({ 
  group, 
  onEditLessons,
  onDeleteLesson 
}: { 
  group: LessonGroup;
  onEditLessons: (levelSubjectId: number, currentLessons: Lesson[], subjectName: string) => void;
  onDeleteLesson: (lessonId: number) => void;
}) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBorderColor = useColorModeValue('blue.300', 'blue.500');
  const expandedBg = useColorModeValue('blue.50', 'blue.900');
  const iconColor = useColorModeValue('blue.600', 'blue.300');
  const toggleIconColorActive = useColorModeValue('blue.600', 'blue.300');
  const toggleIconColorInactive = useColorModeValue('gray.600', 'gray.300');

  const handleEditLessons = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditLessons(group.levelSubjectId, group.lessons, group.subject);
  };

  return (
    <Card
      bg={isOpen ? expandedBg : bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      shadow="sm"
      _hover={{ 
        borderColor: hoverBorderColor,
        shadow: 'md'
      }}
      transition="all 0.2s ease"
      mb={3}
      borderRadius="lg"
    >
      <CardHeader pb={3}>
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
              fontWeight="600"
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
                _hover={{
                  bg: useColorModeValue('blue.100', 'blue.700'),
                  color: useColorModeValue('blue.700', 'blue.200')
                }}
                onClick={handleEditLessons}
              />
            </Tooltip>
            
            <Tooltip label={isOpen ? "Réduire" : "Développer"}>
              <IconButton
                aria-label="Toggle section"
                icon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
                size="sm"
                variant="ghost"
                color={isOpen ? toggleIconColorActive : toggleIconColorInactive}
                _hover={{
                  bg: useColorModeValue('blue.100', 'blue.700'),
                  color: useColorModeValue('blue.700', 'blue.200')
                }}
                onClick={onToggle}
              />
            </Tooltip>
          </HStack>
        </Flex>
      </CardHeader>
      
      <Collapse in={isOpen} animateOpacity>
        <CardBody pt={0}>
          <Divider 
            mb={4} 
            borderColor={useColorModeValue('blue.200', 'blue.600')} 
          />
          <SimpleGrid 
            columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 6 }} 
            spacing={3}
          >
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
  const iconBg = useColorModeValue('blue.100', 'blue.700');
  const iconColor = useColorModeValue('blue.600', 'blue.300');

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
      minH="100%"
      display="flex"
      flexDirection="column"
      shadow="sm"
    >
      <VStack spacing={6} flex={1}>
        <VStack spacing={3}>
          <Center
            w={14}
            h={14}
            bg={iconBg}
            borderRadius="full"
            color={iconColor}
            border="2px solid"
            borderColor={useColorModeValue('blue.200', 'blue.600')}
          >
            <FaGraduationCap size={24} />
          </Center>
          
          <Text
            fontSize="xl"
            fontWeight="700"
            color={textColor}
            textAlign="center"
            lineHeight={1.2}
            letterSpacing="tight"
          >
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
          shadow="sm"
        >
          <VStack spacing={3}>
            <VStack spacing={1}>
              <Text 
                fontSize="2xl" 
                fontWeight="700" 
                color={useColorModeValue('blue.600', 'blue.400')}
                lineHeight={1}
              >
                {totalSubjects}
              </Text>
              <Text 
                fontSize="xs" 
                color={useColorModeValue('gray.500', 'gray.400')}
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Subject{totalSubjects > 1 ? 's' : ''}
              </Text>
            </VStack>
            
            <Divider borderColor={borderColor} />
            
            <VStack spacing={1}>
              <Text 
                fontSize="2xl" 
                fontWeight="700" 
                color={useColorModeValue('blue.600', 'blue.400')}
                lineHeight={1}
              >
                {totalLessons}
              </Text>
              <Text 
                fontSize="xs" 
                color={useColorModeValue('gray.500', 'gray.400')}
                fontWeight="600"
                textTransform="uppercase" 
                letterSpacing="wide"
              >
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
        <Box position="relative">
          <Spinner 
            size="xl" 
            color={useColorModeValue('blue.600', 'blue.300')}
            thickness="3px"
            speed="0.8s"
          />
        </Box>
        <VStack spacing={2}>
          <Text 
            fontSize="lg" 
            fontWeight="600" 
            color={useColorModeValue('gray.700', 'gray.200')}
          >
            Chargement des leçons...
          </Text>
          <Text 
            fontSize="sm" 
            color={useColorModeValue('blue.600', 'blue.400')}
          >
            Veuillez patienter
          </Text>
        </VStack>
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
      bg={useColorModeValue('red.50', 'red.900')}
      borderColor={useColorModeValue('red.200', 'red.700')}
      borderWidth="1px"
    >
      <AlertIcon boxSize="40px" mr={0} mb={4} />
      <Text fontSize="lg" fontWeight="600" mb={2}>
        Erreur de chargement
      </Text>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>
        Impossible de charger les leçons. Veuillez réessayer plus tard.
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
      bg={useColorModeValue('blue.50', 'blue.900')}
      borderColor={useColorModeValue('blue.200', 'blue.600')}
      borderWidth="1px"
    >
      <Box mb={4} color={useColorModeValue('blue.400', 'blue.500')}>
        <FaBookOpen size={48} />
      </Box>
      <Text fontSize="lg" fontWeight="600" mb={2}>
        Aucune leçon disponible
      </Text>
      <Text color={useColorModeValue('blue.600', 'blue.400')}>
        Il n'y a pas encore de contenu pour cette association.
      </Text>
    </Alert>
  </Container>
);

const LessonAccordion = ({ associationId }: Props) => {
  const { data: lessonGroups = [], isLoading, error, refetch } = useFetchLessonsByAssociation(associationId);
  const { mutate: deleteLesson } = useDeleteLessonById(associationId);  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLessonGroup, setSelectedLessonGroup] = useState<{
    levelSubjectId: number;
    lessons: Lesson[];
    subjectName: string;
  } | null>(null);

  const handleEditLessons = (levelSubjectId: number, currentLessons: Lesson[], subjectName: string) => {
    setSelectedLessonGroup({
      levelSubjectId,
      lessons: currentLessons,
      subjectName
    });
    setEditModalOpen(true);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
    if (!editModalOpen) {
      setSelectedLessonGroup(null);
    }
  };

  const handleDeleteLesson = (lessonId: number) => {
    deleteLesson(lessonId);
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  const validGroups = lessonGroups
    .filter(group => group.lessons && group.lessons.length > 0)
    .map(group => ({
      ...group,
      lessons: [...group.lessons].sort((a, b) => a.sortedOrder - b.sortedOrder)
    }));

  if (validGroups.length === 0) return <EmptyState />;

  const groupedByLevel = validGroups.reduce((acc, group) => {
    if (!acc[group.level]) {
      acc[group.level] = [];
    }
    acc[group.level].push(group);
    return acc;
  }, {} as Record<string, LessonGroup[]>);

  return (
    <Container maxW="full" p={0}>
      <VStack spacing={8} align="stretch">
        {Object.entries(groupedByLevel).map(([level, groups]) => {
          const totalLessons = groups.reduce((sum, group) => sum + group.lessons.length, 0);
          
          return (
            <HStack key={level} align="stretch" spacing={6}>
              <LevelSidebar 
                level={level} 
                totalSubjects={groups.length}
                totalLessons={totalLessons}
              />
              
              <Box flex={1} minH="100%">
                <VStack spacing={3} align="stretch" h="full">
                  {groups.map((group, index) => (
                    <SubjectSection 
                      key={group.levelSubjectId || index} 
                      group={group}
                      onEditLessons={handleEditLessons}
                      onDeleteLesson={handleDeleteLesson}
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
            onSuccess={() => {
              refetch();
              toggleEditModal();
            }}
          />
        )}
      </GenericModal>
    </Container>
  );
};

export default LessonAccordion;