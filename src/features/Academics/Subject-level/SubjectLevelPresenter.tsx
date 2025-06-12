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
import type { SubjectLevelItem, LevelWithSubjects} from './types/subject.types.ts';

interface SubjectLevelPresenterProps {
  rows: SubjectLevelItem[] | LevelWithSubjects[]; // Accept both formats
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

  // Debug logging to understand the data structure
  React.useEffect(() => {
    console.log('SubjectLevelPresenter - rows:', rows);
    console.log('SubjectLevelPresenter - total:', total);
    if (rows && rows.length > 0) {
      console.log('First row structure:', rows[0]);
      const firstItem = rows[0];
      if (isLevelWithSubjects(firstItem)) {
        console.log('Data format: LevelWithSubjects');
      } else if (isSubjectLevelItem(firstItem)) {
        console.log('Data format: SubjectLevelItem');
      } else {
        console.log('Data format: Unknown');
      }
    }
  }, [rows, total]);

  const bgGradient = useColorModeValue(
    'linear(to-br, gray.50, white)',
    'linear(to-br, gray.800, gray.900)'
  );

  // Helper function to check if data is in LevelWithSubjects format
  const isLevelWithSubjects = (item: any): item is LevelWithSubjects => {
    return item && 
           typeof item === 'object' && 
           item.level && 
           Array.isArray(item.subjects);
  };

  // Helper function to check if data is in SubjectLevelItem format
  const isSubjectLevelItem = (item: any): item is SubjectLevelItem => {
    return item && 
           typeof item === 'object' && 
           item.level && 
           item.subject && 
           !Array.isArray(item.subjects);
  };

  const filteredRows = useMemo(() => {
    // Safety check: ensure rows is an array and not undefined
    if (!rows || !Array.isArray(rows) || rows.length === 0) {
      return [];
    }

    // Determine data format by checking the first item
    const firstItem = rows[0];
    
    if (isLevelWithSubjects(firstItem)) {
      // Data is already in LevelWithSubjects format
      if (!filterText.trim()) {
        return rows as LevelWithSubjects[];
      }

      // Filter levels based on level name or subject names
      return (rows as LevelWithSubjects[])
        .map((levelItem) => {
          // Safety checks
          if (!levelItem?.level || !Array.isArray(levelItem.subjects)) {
            return null;
          }

          // Filter subjects within this level
          const filteredSubjects = levelItem.subjects.filter((subject) => {
            if (!subject?.name) return false;
            return subject.name.toLowerCase().includes(filterText.toLowerCase());
          });

          // Also check if level name matches the filter
          const levelNameMatches = levelItem.level.name?.toLowerCase().includes(filterText.toLowerCase());

          // Include this level if either the level name matches or it has matching subjects
          if (levelNameMatches || filteredSubjects.length > 0) {
            return {
              ...levelItem,
              subjects: levelNameMatches ? levelItem.subjects : filteredSubjects
            };
          }

          return null;
        })
        .filter((item): item is LevelWithSubjects => item !== null);
    } 
    else if (isSubjectLevelItem(firstItem)) {
      // Data is in SubjectLevelItem format, need to transform
      const subjectLevelRows = rows as SubjectLevelItem[];
      
      if (!filterText.trim()) {
        // Group SubjectLevelItems by level to create LevelWithSubjects
        const levelMap = new Map<number, LevelWithSubjects>();
        
        subjectLevelRows.forEach((item) => {
          // Safety checks for required properties
          if (!item?.level || !item?.subject || 
              typeof item.level.id !== 'number' || 
              typeof item.subject.id !== 'number') {
            console.warn('Invalid SubjectLevelItem structure:', item);
            return; // Skip this item
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
          levelEntry.subjects.push({
            id: item.subject.id,
            code: '',
            name: item.subject.title || 'Unknown Subject',
            departmentId: 0,
            departmentName: '',
            standard: true
          });
        });
        
        return Array.from(levelMap.values());
      }

      // Filter with search text for SubjectLevelItem format
      const levelMap = new Map<number, LevelWithSubjects>();
      
      subjectLevelRows
        .filter((item) => {
          // Safety checks before filtering
          if (!item?.level || !item?.subject) {
            return false;
          }
          
          const subjectTitle = item.subject.title || '';
          const levelName = item.level.name || '';
          
          return subjectTitle.toLowerCase().includes(filterText.toLowerCase()) ||
                 levelName.toLowerCase().includes(filterText.toLowerCase());
        })
        .forEach((item) => {
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
          levelEntry.subjects.push({
            id: item.subject.id,
            code: '',
            name: item.subject.title || 'Unknown Subject',
            departmentId: 0,
            departmentName: '',
            standard: true
          });
        });
      
      return Array.from(levelMap.values());
    }

    // Unknown format, return empty array
    console.warn('Unknown data format:', firstItem);
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
            statTitle="Total des Niveaux"
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
        <SubjectLevelAccordion levels={filteredRows} filterText={filterText} />

        {filteredRows.length === 0 && (
          <Center py={20}>
            <VStack spacing={4}>
              <Icon as={FaGraduationCap} boxSize={16} color="gray.400" />
              <Text fontSize="xl" color="gray.500" textAlign="center">
                Aucun programme disponible pour le moment
              </Text>
            </VStack>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default SubjectLevelPresenter;