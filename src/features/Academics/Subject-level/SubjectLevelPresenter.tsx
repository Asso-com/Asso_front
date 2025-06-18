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
import { SubjectLevelAccordion } from './components/column-actions/SubjectLevelAccordion';
import type { SubjectLevelItem, LevelWithSubjects } from './types/subject.types.ts';
import { useSelector } from 'react-redux';
import type { RootState } from '@store/index';

interface SubjectLevelPresenterProps {
  rows: SubjectLevelItem[] | LevelWithSubjects[]; 
  total: number;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
}

const SubjectLevelPresenter: React.FC<SubjectLevelPresenterProps> = ({
  rows,
  total,
  isLoading,
  isError,
  error,
}) => {
  const [filterText, setFilterText] = useState('');
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);

  const bgGradient = useColorModeValue(
    'linear(to-br, gray.50, white)',
    'linear(to-br, gray.800, gray.900)'
  );

  const isLevelWithSubjects = (item: any): item is LevelWithSubjects => {
    return item && 
           typeof item === 'object' && 
           item.level && 
           Array.isArray(item.subjects);
  };

  const isSubjectLevelItem = (item: any): item is SubjectLevelItem => {
    return item && 
           typeof item === 'object' && 
           item.level && 
           item.subject && 
           !Array.isArray(item.subjects);
  };

  const filteredRows = useMemo(() => {
    if (!rows || !Array.isArray(rows) || rows.length === 0) {
      return [];
    }

    const firstItem = rows[0];
    const normalize = (str: string) =>
      str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

    const normalizedFilter = normalize(filterText);

    if (isLevelWithSubjects(firstItem)) {
      if (!filterText.trim()) {
        return rows as LevelWithSubjects[];
      }

      const result = (rows as LevelWithSubjects[])
        .map((levelItem) => {
          if (!levelItem?.level || !Array.isArray(levelItem.subjects)) {
            return null;
          }

          const levelName = levelItem.level.name || '';
          const normalizedLevelName = normalize(levelName);

          const filteredSubjects = levelItem.subjects.filter((subject) => {
            if (!subject?.name) {
              return false;
            }
            const normalizedSubjectName = normalize(subject.name);
            return normalizedSubjectName.includes(normalizedFilter);
          });

          const levelMatches = normalizedLevelName.includes(normalizedFilter);
          const hasMatchingSubjects = filteredSubjects.length > 0;

          if (levelMatches) {
            return {
              ...levelItem,
              subjects: levelItem.subjects || []
            };
          } else if (hasMatchingSubjects) {
            return {
              ...levelItem,
              subjects: filteredSubjects
            };
          }

          return null;
        })
        .filter((item): item is LevelWithSubjects => {
          return item !== null && 
                 item.level && 
                 Array.isArray(item.subjects) && 
                 item.subjects.length > 0;
        });

      return result;
    } 
    else if (isSubjectLevelItem(firstItem)) {
      const subjectLevelRows = rows as SubjectLevelItem[];

      const levelMap = new Map<number, LevelWithSubjects>();

      subjectLevelRows.forEach((item) => {
        if (!item?.level || !item?.subject || 
            typeof item.level.id !== 'number' || 
            typeof item.subject.id !== 'number') {
          return;
        }

        const levelId = item.level.id;
        if (!levelMap.has(levelId)) {
          levelMap.set(levelId, {
            id: levelId,
            level: {
              id: item.level.id,
              name: item.level.name || 'Unknown Level',
              code: '',
              order: 0,
              active: true,
              categoryId: 0,
              categoryName: '',
              standard: true
            },
            subjects: []
          });
        }

        const levelEntry = levelMap.get(levelId)!;
        const subjectExists = levelEntry.subjects.some(s => s.id === item.subject.id);
        if (!subjectExists) {
          levelEntry.subjects.push({
            id: item.subject.id,
            code: '',
            name: item.subject.title || 'Unknown Subject',
            departmentId: 0,
            departmentName: '',
            standard: true
          });
        }
      });

      const allLevels = Array.from(levelMap.values());

      if (!filterText.trim()) {
        return allLevels;
      }

      const result = allLevels
        .map((levelItem) => {
          const levelName = levelItem.level.name || '';
          const normalizedLevelName = normalize(levelName);

          const filteredSubjects = levelItem.subjects.filter((subject) => {
            if (!subject?.name) return false;
            const normalizedSubjectName = normalize(subject.name);
            return normalizedSubjectName.includes(normalizedFilter);
          });

          const levelMatches = normalizedLevelName.includes(normalizedFilter);
          const hasMatchingSubjects = filteredSubjects.length > 0;

          if (levelMatches) {
            return {
              ...levelItem,
              subjects: levelItem.subjects || []
            };
          } else if (hasMatchingSubjects) {
            return {
              ...levelItem,
              subjects: filteredSubjects
            };
          }

          return null;
        })
        .filter((item): item is LevelWithSubjects => {
          return item !== null && 
                 item.level && 
                 Array.isArray(item.subjects) && 
                 item.subjects.length > 0;
        });

      return result;
    }
    return [];
  }, [rows, filterText]);

  if (isLoading) {
    return (
      <Box minH="100vh">
        <Center py={20}>
          <VStack spacing={4}>
            <Spinner size="xl" color="blue.500" thickness="4px" />
            <Text fontSize="lg" color="gray.600">
              Chargement du programme académique...
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
        {/* Stats Section */}
        <SimpleGrid columns={{ base: 1 }} spacing={8}>
          <StatsHorizontal
            icon={HiOutlineOfficeBuilding}
            color="blue.500"
            stats={total.toString()}
            statTitle="Total Levels"
            borderLeft="6px solid"
            borderColor="blue.500"
            bg="white"
            boxShadow="lg"
            _dark={{ bg: 'gray.800' }}
          />
        </SimpleGrid>

        {/* Header avec filtre */}
        <HeaderActions onFilterChange={setFilterText} />
        {/* Content */}
        <SubjectLevelAccordion 
          levels={filteredRows} 
          filterText={filterText} 
          associationId={associationId} 
        />

        {filteredRows.length === 0 && (
          <Center py={20}>
            <VStack spacing={4}>
              <Icon as={FaGraduationCap} boxSize={16} color="gray.400" />
              <Text fontSize="xl" color="gray.500" textAlign="center">
                Aucun programme disponible pour le moment
                {filterText && ` (filtre: "${filterText}")`}
              </Text>
            </VStack>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default SubjectLevelPresenter;
