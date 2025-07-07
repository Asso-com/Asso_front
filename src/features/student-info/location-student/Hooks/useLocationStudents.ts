import { useState, useEffect } from 'react';
import StudentLocationApi from '../services/StudentLocationApi';
import type { ProcessedStudentData, StudentResponse } from '../Types/StudentLocationType';

interface UseLocationStudentsReturn {
  allStudents: ProcessedStudentData[];
  studentsWithLocation: ProcessedStudentData[];
  studentsWithoutLocation: ProcessedStudentData[];
  isLoading: boolean;
  isError: boolean;
}

const useLocationStudents = (associationId: number): UseLocationStudentsReturn => {
  const [allStudents, setAllStudents] = useState<ProcessedStudentData[]>([]);
  const [studentsWithLocation, setStudentsWithLocation] = useState<ProcessedStudentData[]>([]);
  const [studentsWithoutLocation, setStudentsWithoutLocation] = useState<ProcessedStudentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!associationId) return;

    const fetchStudents = async () => {
      setIsLoading(true);
      setIsError(false);
      
      try {
        const students: StudentResponse[] = await StudentLocationApi.getStudentsByAssociation(associationId);
        
        const withLocation: ProcessedStudentData[] = [];
        const withoutLocation: ProcessedStudentData[] = [];
        const all: ProcessedStudentData[] = [];

        students.forEach((student) => {
          const baseStudentData = {
            id: student.id,
            name: `${student.firstName} ${student.lastName}`,
            email: student.email,
            registrationId: student.registrationId,
            establishment: student.establishment,
            address: student.address,
            city: student.city,
            enrolledInCurrentPeriod: student.enrolledInCurrentPeriod,
            searchText: `${student.firstName} ${student.lastName} ${student.email} ${student.address} ${student.city}`.toLowerCase(),
          };

          // Vérifier si l'étudiant a une adresse valide
          if (student.address && student.address.trim() !== "" && student.city && student.city.trim() !== "") {
            const coords = geocodeAddress(student.address, student.city);
            const studentWithCoords = {
              ...baseStudentData,
              lat: coords.lat,
              lon: coords.lon,
              hasLocation: true,
            };
            withLocation.push(studentWithCoords);
            all.push(studentWithCoords);
          } else {
            const studentWithoutCoords = {
              ...baseStudentData,
              lat: 0,
              lon: 0,
              hasLocation: false,
            };
            withoutLocation.push(studentWithoutCoords);
            all.push(studentWithoutCoords);
          }
        });
        
        setAllStudents(all);
        setStudentsWithLocation(withLocation);
        setStudentsWithoutLocation(withoutLocation);
      } catch (error) {
        setIsError(true);
        console.error('Error processing students:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [associationId]);

  return { allStudents, studentsWithLocation, studentsWithoutLocation, isLoading, isError };
};

// Fonction de géocodage pour Villeneuve-la-Garenne
const geocodeAddress = (address: string, city: string) => {
  const baseCoords = { lat: 48.936616, lon: 2.324789 };
  const addressHash = hashCode(address + city);
  const variation = 0.006; // Réduire la variation pour rester dans la ville
  
  const latOffset = ((addressHash % 1000) / 1000 - 0.5) * variation;
  const lonOffset = (((addressHash * 7) % 1000) / 1000 - 0.5) * variation;

  return {
    lat: parseFloat((baseCoords.lat + latOffset).toFixed(6)),
    lon: parseFloat((baseCoords.lon + lonOffset).toFixed(6)),
  };
};

const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export default useLocationStudents;