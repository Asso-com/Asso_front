import React, { useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import StatsHorizontal from "@components/shared/StatsHorizontal";
import {
  FaBookOpen,
  FaLayerGroup,
  FaUserCheck,
  FaUserGraduate,
} from "react-icons/fa";
import PanelOptions from "./components/PanelOptions";
import mockStudents from "./data";
import ClearFilter from "./components/ClearFilter";
import useFilteredStudents from "./useFilteredStudents";
import StudentCard from "./components/StudentCard";

const LinguisticLevelsRegistrationContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredStudents = useFilteredStudents({
    students: mockStudents,
    searchTerm,
    selectedLevel,
    selectedSubject,
  });

  const uniqueLevels = [
    ...new Set(
      mockStudents.flatMap((s) => s.enrolledSubjects.map((e) => e.level.code))
    ),
  ];
  const uniqueSubjects = [
    ...new Set(
      mockStudents.flatMap((s) => s.enrolledSubjects.map((e) => e.subject.name))
    ),
  ];

  const totalStudents = mockStudents.length;
  const totalEnrollments = mockStudents.reduce(
    (sum, student) => sum + student.enrolledSubjects.length,
    0
  );

  return (
    <Box
      minH={"100%"}
      height={"100%"}
      display="flex"
      flexDirection="column"
      overflow="hidden"
      gap={2}
      p={2}
    >
      <Box>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
          <StatsHorizontal
            icon={FaUserGraduate}
            color="blue.500"
            stats={totalStudents.toString()}
            statTitle="Total Étudiants"
            borderLeft="6px solid"
            borderColor="blue.500"
          />
          <StatsHorizontal
            icon={FaUserCheck}
            color="teal.500"
            stats={totalEnrollments.toString()}
            statTitle="Total Inscriptions"
            borderLeft="6px solid"
            borderColor="teal.500"
          />
          <StatsHorizontal
            icon={FaLayerGroup}
            color="orange.500"
            stats={uniqueLevels.length.toString()}
            statTitle="Niveaux Uniques"
            borderLeft="6px solid"
            borderColor="orange.500"
          />
          <StatsHorizontal
            icon={FaBookOpen}
            color="purple.500"
            stats={uniqueSubjects.length.toString()}
            statTitle="Sujets Uniques"
            borderLeft="6px solid"
            borderColor="purple.500"
          />
        </SimpleGrid>
      </Box>
      <PanelOptions
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        uniqueLevels={uniqueLevels}
        uniqueSubjects={uniqueSubjects}
        setViewMode={setViewMode}
        viewMode={viewMode}
      />

      <Box flex={1} overflow="auto">
        <SimpleGrid
          columns={{
            base: 1,
            md: viewMode === "grid" ? 2 : 1,
            lg: viewMode === "grid" ? 4 : 1,
          }}
          spacing={8}
        >
          {filteredStudents.map((studentData) => (
            <StudentCard
              key={studentData.student.id}
              studentData={studentData}
            />
          ))}
        </SimpleGrid>

        <ClearFilter
          filteredStudents={filteredStudents}
          setSearchTerm={setSearchTerm}
          setSelectedLevel={setSelectedLevel}
          setSelectedSubject={setSelectedSubject}
        />
      </Box>
    </Box>
  );
};

export default LinguisticLevelsRegistrationContainer;
