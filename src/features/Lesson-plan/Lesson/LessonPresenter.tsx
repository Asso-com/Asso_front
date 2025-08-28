import React, { useState, useMemo } from 'react';
import {
  Box,
  SimpleGrid,
} from '@chakra-ui/react';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { FaGraduationCap ,FaBook, FaBookOpen  } from 'react-icons/fa';
import StatsHorizontal from '@components/shared/StatsHorizontal';
import HeaderActions from "./components/HeaderActions";
import LessonAccordion from './components/Column-actions/LessonAccordion';
import type { LessonLevelItem } from './components/Column-actions/LessonAccordion';
import { useSelector } from 'react-redux';
import type { RootState } from '@store/index';

interface LessonPresenterProps {
  rows: LessonLevelItem[];
}

const LessonPresenter: React.FC<LessonPresenterProps> = ({
  rows,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType] = useState('all');
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  
  const normalize = (str: string) =>
    str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

  const filteredRows = useMemo(() => {
    if (!Array.isArray(rows)) return [];
    if (!searchTerm.trim()) return rows;

    const normalizedSearch = normalize(searchTerm);
    
    return rows.filter((item) => {
      const levelMatch = normalize(item.level).includes(normalizedSearch);
      const subjectMatch = normalize(item.subject).includes(normalizedSearch);
      return levelMatch || subjectMatch;
    });
  }, [rows, searchTerm]);

  const stats = useMemo(() => {
    const totalGroups = filteredRows.length;
    const totalLessons = filteredRows.reduce((sum, group) => sum + (group.lessons?.length ?? 0), 0);
    const totalSubjects = new Set(filteredRows.map(group => group.subject)).size;
    const totalLevels = new Set(filteredRows.map(group => group.level)).size;
    
    return { totalGroups, totalLessons, totalSubjects, totalLevels };
  }, [filteredRows]);

  return (
    <Box 
      h="100vh" 
      display="flex" 
      flexDirection="column"
      overflow="hidden" // Prevent page scrolling
    >
      {/* Fixed Stats Section */}
      <Box
        flexShrink={0} // Prevent shrinking
        _dark={{ bg: 'gray.900' }}
        py={1}
        px={1}
        boxShadow="sm"
      >
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
          <StatsHorizontal
            icon={HiOutlineOfficeBuilding}
            color="blue.500"
            stats={stats.totalGroups.toString()}
            statTitle="Lesson Groups"
            borderLeft="6px solid"
            borderColor="blue.500"
            boxShadow="lg"
            _dark={{ bg: 'gray.800' }}
          />
          <StatsHorizontal
            icon={FaGraduationCap}
            color="green.500"
            stats={stats.totalLevels.toString()}
            statTitle="Levels"
            borderLeft="6px solid"
            borderColor="green.500"
            bg="white"
            boxShadow="lg"
            _dark={{ bg: 'gray.800' }}
          />
          <StatsHorizontal
            icon={FaBook}
            color="purple.500"
            stats={stats.totalSubjects.toString()}
            statTitle="Subjects"
            borderLeft="6px solid"
            borderColor="purple.500"
            bg="white"
            boxShadow="lg"
            _dark={{ bg: 'gray.800' }}
          />
          <StatsHorizontal
            icon={FaBookOpen}
            color="orange.500"
            stats={stats.totalLessons.toString()}
            statTitle="Total Lessons"
            borderLeft="6px solid"
            borderColor="orange.500"
            bg="white"
            boxShadow="lg"
            _dark={{ bg: 'gray.800' }}
          />
        </SimpleGrid>
      </Box>

      {/* Fixed Header Actions Section */}
      <Box
        flexShrink={0} // Prevent shrinking
        _dark={{ bg: 'gray.900' }}
        py={1}
        px={1}
        boxShadow="sm"
      >
        <HeaderActions
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
        />
      </Box>

      {/* Scrollable Content Section */}
      <Box 
        flex={1} // Take remaining space
        overflow="auto" // Enable scrolling only in this section
        p={1}
      >
        <LessonAccordion 
          associationId={associationId}
          data={filteredRows}
          searchTerm={searchTerm}
        />
      </Box>
    </Box>
  );
};

export default LessonPresenter;