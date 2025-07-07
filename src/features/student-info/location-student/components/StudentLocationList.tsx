import { useState } from 'react';
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  Card,
  CardBody,
  Text,
  Button,
  Select,
  Flex,
  Badge,
  Spinner,
  VStack,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { FaSearch, FaMapMarkerAlt, FaGraduationCap, FaExclamationTriangle } from 'react-icons/fa';
import type { ProcessedStudentData } from '../Types/StudentLocationType';

interface StudentLocationListProps {
  onCenter: (lat: number, lon: number, studentId: string) => void;
  allStudents: ProcessedStudentData[];
  studentsWithLocation: ProcessedStudentData[];
  studentsWithoutLocation: ProcessedStudentData[];
  isLoading: boolean;
  isError: boolean;
  selectedStudentId: string | null;
}

const StudentLocationList = ({ 
  onCenter, 
  allStudents, 
  studentsWithLocation, 
  studentsWithoutLocation, 
  isLoading, 
  isError,
  selectedStudentId 
}: StudentLocationListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollmentFilter, setEnrollmentFilter] = useState('all');

  // Filtrage des étudiants
  const filteredWithLocation = studentsWithLocation.filter(student => {
    const matchesSearch = !searchTerm || student.searchText.includes(searchTerm.toLowerCase());
    const matchesEnrollment = enrollmentFilter === 'all' || 
      (enrollmentFilter === 'enrolled' && student.enrolledInCurrentPeriod) ||
      (enrollmentFilter === 'not_enrolled' && !student.enrolledInCurrentPeriod);
    return matchesSearch && matchesEnrollment;
  });

  const filteredWithoutLocation = studentsWithoutLocation.filter(student => {
    const matchesSearch = !searchTerm || student.searchText.includes(searchTerm.toLowerCase());
    const matchesEnrollment = enrollmentFilter === 'all' || 
      (enrollmentFilter === 'enrolled' && student.enrolledInCurrentPeriod) ||
      (enrollmentFilter === 'not_enrolled' && !student.enrolledInCurrentPeriod);
    return matchesSearch && matchesEnrollment;
  });

  // Rendu conditionnel
  const renderContent = () => {
    if (isLoading) {
      return (
        <Box height="100%" bg="white" display="flex" alignItems="center" justifyContent="center">
          <VStack>
            <Spinner size="lg" color="blue.500" />
            <Text color="gray.600">Loading students...</Text>
          </VStack>
        </Box>
      );
    }

    if (isError) {
      return (
        <Box height="100%" bg="white" display="flex" alignItems="center" justifyContent="center">
          <Text color="red.500">Error loading student data</Text>
        </Box>
      );
    }

    return (
      <Box height="100%" bg="white" display="flex" flexDirection="column">
        {/* Header avec filtres */}
        <Box p={4} borderBottom="1px" borderColor="gray.200" flexShrink={0}>
          <Flex align="center" mb={3}>
            <FaGraduationCap color="#3182ce" size="20" />
            <Text fontWeight="bold" fontSize="lg" color="blue.600" ml={2}>
              Student Locations
            </Text>
          </Flex>

          {/* Statistiques */}
          <HStack mb={3} spacing={4} justify="center">
            <Badge colorScheme="blue" variant="solid" p={2} borderRadius="md">
              📍 {studentsWithLocation.length} With Location
            </Badge>
            <Badge colorScheme="orange" variant="solid" p={2} borderRadius="md">
              ⚠️ {studentsWithoutLocation.length} Without Location
            </Badge>
            <Badge colorScheme="gray" variant="solid" p={2} borderRadius="md">
              👥 {allStudents.length} Total
            </Badge>
          </HStack>

          {/* Filtres */}
          <VStack spacing={3} align="stretch">
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray" />
              </InputLeftElement>
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="white"
                borderColor="gray.300"
              />
            </InputGroup>

            <Select
              size="sm"
              value={enrollmentFilter}
              onChange={(e) => setEnrollmentFilter(e.target.value)}
              bg="white"
            >
              <option value="all">All Students</option>
              <option value="enrolled">Currently Enrolled</option>
              <option value="not_enrolled">Not Enrolled</option>
            </Select>
          </VStack>
        </Box>

        {/* Liste des étudiants */}
        <Box flex={1} overflow="auto" p={2}>
          {/* Étudiants AVEC location */}
          {filteredWithLocation.length > 0 && (
            <Box mb={4}>
              <Text fontSize="sm" fontWeight="bold" color="blue.600" mb={2} px={2}>
                📍 Students with Location ({filteredWithLocation.length})
              </Text>
              <Stack spacing={2}>
                {filteredWithLocation.map((student) => (
                  <Card
                    key={`with-${student.id}`}
                    bg={selectedStudentId === student.id ? "blue.50" : "white"}
                    boxShadow="sm"
                    borderWidth="1px"
                    borderColor={selectedStudentId === student.id ? "blue.300" : "gray.100"}
                    borderLeftWidth={selectedStudentId === student.id ? "4px" : "1px"}
                    borderLeftColor={selectedStudentId === student.id ? "blue.500" : "gray.100"}
                    borderRadius="md"
                    _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
                    cursor="pointer"
                  >
                    <CardBody p={3}>
                      <Flex align="center" mb={2}>
                        <Text fontSize="lg" mr={3} color="blue.500">
                          👨‍🎓
                        </Text>
                        <Box flex="1">
                          <Text fontWeight="semibold" fontSize="sm" noOfLines={1}>
                            {student.name}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            🆔 {student.registrationId}
                          </Text>
                        </Box>
                        <Badge 
                          colorScheme={student.enrolledInCurrentPeriod ? "green" : "orange"}
                          size="sm"
                        >
                          {student.enrolledInCurrentPeriod ? "Enrolled" : "Not Enrolled"}
                        </Badge>
                      </Flex>
                      
                      <Text fontSize="xs" color="gray.600" mb={1} noOfLines={1}>
                        📧 {student.email}
                      </Text>
                      
                      <Text fontSize="xs" color="gray.600" mb={1} noOfLines={1}>
                        🏫 {student.establishment}
                      </Text>
                      
                      <Text fontSize="xs" color="gray.500" mb={2} noOfLines={1}>
                        📍 {student.address} - {student.city}
                      </Text>

                      <Flex justify="space-between" align="center">
                        <Text fontSize="xs" color="gray.400">
                          {student.lat.toFixed(4)}, {student.lon.toFixed(4)}
                        </Text>
                        <Button
                          leftIcon={<FaMapMarkerAlt />}
                          colorScheme={selectedStudentId === student.id ? "blue" : "blue"}
                          variant={selectedStudentId === student.id ? "solid" : "outline"}
                          size="xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            onCenter(student.lat, student.lon, student.id);
                          }}
                        >
                          {selectedStudentId === student.id ? "Located" : "Locate"}
                        </Button>
                      </Flex>
                    </CardBody>
                  </Card>
                ))}
              </Stack>
            </Box>
          )}

          {/* Séparateur */}
          {filteredWithLocation.length > 0 && filteredWithoutLocation.length > 0 && (
            <Divider my={4} />
          )}

          {/* Étudiants SANS location */}
          {filteredWithoutLocation.length > 0 && (
            <Box>
              <Text fontSize="sm" fontWeight="bold" color="orange.600" mb={2} px={2}>
                ⚠️ Students without Location ({filteredWithoutLocation.length})
              </Text>
              <Stack spacing={2}>
                {filteredWithoutLocation.map((student) => (
                  <Card
                    key={`without-${student.id}`}
                    bg="orange.50"
                    boxShadow="sm"
                    borderWidth="1px"
                    borderColor="orange.200"
                    borderRadius="md"
                    opacity={0.8}
                  >
                    <CardBody p={3}>
                      <Flex align="center" mb={2}>
                        <Text fontSize="lg" mr={3} color="orange.500">
                          <FaExclamationTriangle />
                        </Text>
                        <Box flex="1">
                          <Text fontWeight="semibold" fontSize="sm" noOfLines={1}>
                            {student.name}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            🆔 {student.registrationId}
                          </Text>
                        </Box>
                        <Badge 
                          colorScheme={student.enrolledInCurrentPeriod ? "green" : "orange"}
                          size="sm"
                        >
                          {student.enrolledInCurrentPeriod ? "Enrolled" : "Not Enrolled"}
                        </Badge>
                      </Flex>
                      
                      <Text fontSize="xs" color="gray.600" mb={1} noOfLines={1}>
                        📧 {student.email}
                      </Text>
                      
                      <Text fontSize="xs" color="gray.600" mb={1} noOfLines={1}>
                        🏫 {student.establishment}
                      </Text>
                      
                      <Text fontSize="xs" color="orange.600" mb={2} fontStyle="italic">
                        📍 No valid address available
                      </Text>

                      <Flex justify="space-between" align="center">
                        <Text fontSize="xs" color="orange.500">
                          Location unavailable
                        </Text>
                        {/* PAS DE BOUTON LOCATE pour ceux sans location */}
                      </Flex>
                    </CardBody>
                  </Card>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return renderContent();
};

export default StudentLocationList;