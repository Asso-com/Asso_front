import {
  Card,
  CardBody,
  VStack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import type { FormikProps } from "formik";
import RenderFormBuilder from "@components/shared/form-builder/RenderFormBuilder";
import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";
import type { Field } from "@/types/formTypes";
import useFetchClassRoom from "@features/Academics/Class-room/hooks/useFetchClassRoom";
import useFetchStaff from "@features/human-resource/staff/hooks/useFetchStaff";
import type { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import type { UpdateSessionFormData } from "./EditSessionSchedule";

interface UpdateSessionInfoCardProps {
  cardBg: string;
  formik: FormikProps<UpdateSessionFormData>;
  sessionData: SessionSchuduleDate;
  staffOptions?: Array<{ label: string; value: string }>;
}

const UpdateSessionInfoCard: React.FC<UpdateSessionInfoCardProps> = ({
  cardBg,
  formik,
  sessionData,
  staffOptions = [],
}) => {
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  
  const { data: classRoomsData, isLoading: isLoadingClassRooms } = useFetchClassRoom(associationId);
  const { data: staffData, isLoading: isLoadingStaff } = useFetchStaff(associationId);
  const classRoomOptions = classRoomsData?.map((classRoom: any) => ({
    label: classRoom.name,
    value: classRoom.id?.toString(),
  })) || [];

  const teacherOptions = staffOptions.length > 0 ? staffOptions : 
    (staffData?.filter((staff: any) => staff.isActive)
      .map((staff: any) => ({
        label: `${staff.firstName || ""} ${staff.lastName || ""}`.trim(),
        value: staff.id?.toString(),
      })) || []);

  useEffect(() => {
    if (classRoomsData && sessionData.classRoom && !formik.values.classRoom) {
      
      const matchingClassRoom = classRoomsData.find((room: any) => 
        room.name === sessionData.classRoom
      );
      
      if (matchingClassRoom) {
        formik.setFieldValue('classRoom', matchingClassRoom.id?.toString());
      } else {
      }
    }
  }, [classRoomsData, sessionData.classRoom, formik.values.classRoom]);

  useEffect(() => {
    if (teacherOptions.length > 0 && sessionData.staffId && !formik.values.staffId) {
      const matchingTeacher = teacherOptions.find((teacher: any) => 
        teacher.value === sessionData.staffId?.toString() ||
        teacher.value === sessionData.staffId
      );
      
      if (matchingTeacher) {
        formik.setFieldValue('staffId', matchingTeacher.value);
      } else {
        const staffMember = staffData?.find((staff: any) => 
          staff.id === sessionData.staffId || 
          staff.id?.toString() === sessionData.staffId?.toString()
        );
        
        if (staffMember) {
          formik.setFieldValue('staffId', staffMember.id?.toString());
        }
      }
    }
  }, [teacherOptions, sessionData.staffId, formik.values.staffId, staffData]);

  const sessionInfoFields: Field[] = [
    {
      name: "startTime",
      label: "Start Time",
      type: "time",
      validationRules: { required: true },
      placeholder: "Select start time",
    },
    {
      name: "endTime",
      label: "End Time",
      type: "time",
      validationRules: { required: true },
      placeholder: "Select end time",
    },
    {
      name: "classRoom",
      label: "Classroom",
      type: "select",
      options: classRoomOptions,
      validationRules: { required: false },
      placeholder: isLoadingClassRooms ? "Loading classrooms..." : "Select classroom",
    },
    {
      name: "staffId",
      label: "Teacher",
      type: "select",
      options: teacherOptions,
      validationRules: { required: true },
      placeholder: isLoadingStaff ? "Loading teachers..." : "Select teacher",
    },
  ];

  return (
    <Card bg={cardBg} shadow="md" borderRadius="md" flex={1}>
      <CardBody>
        <VStack align="start" spacing={4}>
          <Text fontSize="lg" fontWeight="bold" color="blue.600" mb={2}>
            Update Session Information
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
            {sessionInfoFields.map((field) => (
              <RenderFormBuilder
                key={field.name}
                field={field}
                labelDirection="top"
              />
            ))}
          </SimpleGrid>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default UpdateSessionInfoCard;