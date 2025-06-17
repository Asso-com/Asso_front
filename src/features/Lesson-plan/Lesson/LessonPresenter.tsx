
// LessonPresenter.tsx
import React, { useState, useMemo } from 'react';
import {
  Box,
  SimpleGrid,
  VStack,
  Text,
  Center,
  Spinner,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { FaGraduationCap } from 'react-icons/fa';
import { MdBlock } from 'react-icons/md';
import StatsHorizontal from '@components/shared/StatsHorizontal';
import HeaderActions from "./components/HeaderActions";
import LessonAccordion from './components/Column-actions/LessonAccordion';
import type { LessonLevelItem } from './types/lesson.types';
import { useSelector } from 'react-redux';
import type { RootState } from '@store/index';

interface LessonPresenterProps {
  rows: LessonLevelItem[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
}

const LessonPresenter: React.FC<LessonPresenterProps> = ({
  rows,
  total,
  isLoading,
  isError,
  error,
}) => {
  const [filterText] = useState('');
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
const [searchTerm, setSearchTerm] = useState('');
const [filterType, setFilterType] = useState('all');

  const bgGradient = useColorModeValue(
    'linear(to-br, gray.50, white)',
    'linear(to-br, gray.800, gray.900)'
  );

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

  const normalizedFilter = normalize(filterText);

  const filteredRows = useMemo(() => {
    if (!Array.isArray(rows)) return [];

    return rows
      .map((item) => {
        const levelMatch = normalize(item.level).includes(normalizedFilter);
        const subjectMatch = normalize(item.subject).includes(normalizedFilter);
        const lessonMatch = item.lessons.some(lesson => normalize(lesson.name).includes(normalizedFilter));

        if (levelMatch || subjectMatch || lessonMatch) {
          return {
            ...item,
            lessons: item.lessons.filter(lesson => normalize(lesson.name).includes(normalizedFilter) || !filterText)
          };
        }

        return null;
      })
      .filter((x): x is LessonLevelItem => x !== null && x.lessons.length > 0);
  }, [rows, filterText]);

  if (isLoading) {
    return (
      <Box minH="100vh">
        <Center py={20}>
          <VStack spacing={4}>
            <Spinner size="xl" color="blue.500" thickness="4px" />
            <Text fontSize="lg" color="gray.600">
              Chargement des leçons...
            </Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box minH="100vh" bgGradient={bgGradient}>
        <Center py={20}>
          <VStack spacing={4}>
            <Icon as={MdBlock} boxSize={12} color="red.400" />
            <Text color="red.500" fontSize="lg" textAlign="center">
              Erreur : {error?.message ?? 'Erreur inconnue'}
            </Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  return (
    <Box minH="100vh">
      <Box height="100%" display="flex" flexDirection="column" gap={4} p={1}>
        <SimpleGrid columns={{ base: 1 }} spacing={8}>
          <StatsHorizontal
            icon={HiOutlineOfficeBuilding}
            color="blue.500"
            stats={total.toString()}
            statTitle="Total Lesson Groups"
            borderLeft="6px solid"
            borderColor="blue.500"
            bg="white"
            boxShadow="lg"
            _dark={{ bg: 'gray.800' }}
          />
        </SimpleGrid>

<HeaderActions
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  filterType={filterType}
  onFilterTypeChange={setFilterType}
/>
              <LessonAccordion associationId={associationId} />

        {filteredRows.length === 0 && (
          <Center py={20}>
            <VStack spacing={4}>
              <Icon as={FaGraduationCap} boxSize={16} color="gray.400" />
              <Text fontSize="xl" color="gray.500" textAlign="center">
                Aucune leçon disponible pour le moment
                {filterText && ` (filtre: "${filterText}")`}
              </Text>
            </VStack>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default LessonPresenter;
