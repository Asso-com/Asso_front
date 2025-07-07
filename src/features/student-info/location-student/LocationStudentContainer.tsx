import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import MapComponent from './components/MapComponent';
import StudentLocationList from './components/StudentLocationList';
import useLocationStudents from './Hooks/useLocationStudents';

const LocationStudentContainer = () => {
  const [centerFunction, setCenterFunction] = useState<((lat: number, lon: number, studentId: string) => void) | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  
  // ID d'association (remplacez par votre logique dynamique)
  const associationId = 1;
  const { allStudents, studentsWithLocation, studentsWithoutLocation, isLoading, isError } = useLocationStudents(associationId);

  const handleCenterFromMap = (centerFunc: (lat: number, lon: number, studentId: string) => void) => {
    setCenterFunction(() => centerFunc);
  };

  const handleCenterFromList = (lat: number, lon: number, studentId: string) => {
    setSelectedStudentId(studentId);
    if (centerFunction) {
      centerFunction(lat, lon, studentId);
    }
  };

  return (
    <Flex height="100vh">
      <Box width="35%" bg="gray.50" overflowY="auto">
        <StudentLocationList 
          onCenter={handleCenterFromList} 
          allStudents={allStudents}
          studentsWithLocation={studentsWithLocation}
          studentsWithoutLocation={studentsWithoutLocation}
          isLoading={isLoading}
          isError={isError}
          selectedStudentId={selectedStudentId}
        />
      </Box>
      <Box flex="1">
        <MapComponent 
          onCenter={handleCenterFromMap} 
          studentsWithLocation={studentsWithLocation}
          selectedStudentId={selectedStudentId}
        />
      </Box>
    </Flex>
  );
};

export default LocationStudentContainer;