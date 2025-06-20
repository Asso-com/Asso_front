import React, { useState, useMemo } from 'react';
import {
  Box,
  SimpleGrid,
} from '@chakra-ui/react';
// import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { FaGraduationCap, FaBook, FaBookOpen } from 'react-icons/fa';
import StatsHorizontal from '@components/shared/StatsHorizontal';
import HeaderActions from "./components/HeaderActions";
import { useSelector } from 'react-redux';
import type { RootState } from '@store/index';
import TopicAccordion, { type LessonItem } from './components/Column-actions/TopicsAccordion'; // Fixed import path

interface TopicPresenterProps {
  rows: LessonItem[]; // Changed to match TopicAccordion interface
}

const TopicPresenter: React.FC<TopicPresenterProps> = ({ rows }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // Made it stateful
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

  const filteredRows = useMemo(() => {
    if (!Array.isArray(rows)) return [];
    
    let filtered = rows;

    // Apply search filter - only by lesson name and subject level
    if (searchTerm.trim()) {
      const normalizedSearch = normalize(searchTerm);
      filtered = filtered.filter((item) => {
        const lessonMatch = normalize(item.lessonName).includes(normalizedSearch);
        const subjectMatch = normalize(item.levelSubject).includes(normalizedSearch);
        return lessonMatch || subjectMatch;
      });
    }

    // Apply additional filters if needed
    if (filterType !== 'all') {
      // Add your filter logic here based on filterType
      // For example:
      // filtered = filtered.filter(item => item.someProperty === filterType);
    }

    return filtered;
  }, [rows, searchTerm, filterType]);

  const stats = useMemo(() => {
    const totalGroups = filteredRows.length;
    const totalTopics = filteredRows.reduce((sum, group) => sum + (group.topics?.length ?? 0), 0);
    const totalSubjects = new Set(filteredRows.map(group => group.levelSubject)).size;
    const totalLessons = filteredRows.length;

    return { totalGroups, totalTopics, totalSubjects, totalLessons };
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
        borderColor="gray.200"
        boxShadow="sm"
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <StatsHorizontal
            icon={FaGraduationCap}
            color="green.500"
            stats={stats.totalLessons.toString()}
            statTitle="Lessons"
            borderLeft="6px solid"
            borderColor="green.500"
            bg="white"
            boxShadow="lg"
            _dark={{ bg: 'gray.800' }}
          />
          <StatsHorizontal
            icon={FaBook}
            color="blue.500"
            stats={stats.totalSubjects.toString()}
            statTitle="Subjects"
            borderLeft="6px solid"
            borderColor="blue.500"
            bg="white"
            boxShadow="lg"
            _dark={{ bg: 'gray.800' }}
          />
          <StatsHorizontal
            icon={FaBookOpen}
            color="purple.500"
            stats={stats.totalTopics.toString()}
            statTitle="Total Topics"
            borderLeft="6px solid"
            borderColor="purple.500"
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
          onFilterChange={setFilterType}
        />
      </Box>

      {/* Scrollable Content Section */}
      <Box 
        flex={1} // Take remaining space
        overflow="auto" // Enable scrolling only in this section
        p={1}
      >
        <TopicAccordion
          associationId={associationId}
          data={filteredRows}
          searchTerm={searchTerm}
        />
      </Box>
    </Box>
  );
};

export default TopicPresenter;