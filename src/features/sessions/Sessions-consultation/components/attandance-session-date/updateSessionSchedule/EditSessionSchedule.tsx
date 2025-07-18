import { VStack, HStack, Button, useColorModeValue } from "@chakra-ui/react";
import { useFormik,FormikProvider } from "formik";
import UpdateSessionInfoCard from "./UpdateSessionInfoCard";
import RemarksCard from "./RemarksCard";
import useUpdateSessionSchedule from "../../../hooks/useUpdateSessionSchedule";
import type { SessionSchuduleDate } from "@features/sessions/Session-schedule/types";
import { getUserTimezone } from "@utils/timeUtils";

interface UpdateSessionScheduleDateProps {
  sessionData: SessionSchuduleDate;
  onClose: () => void;
  staffOptions?: Array<{ label: string; value: string }>;
}

export interface UpdateSessionFormData {
  startTime: string;
  endTime: string;
  classRoom: string;
  staffId: string;
  adminRemark: string;
  profRemark: string;
  timeZone: string;

}

const UpdateSessionScheduleDate: React.FC<UpdateSessionScheduleDateProps> = ({
  sessionData,
  onClose,
  staffOptions = [],
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const { mutate: updateSession, isPending } = useUpdateSessionSchedule( );

  const formik = useFormik<UpdateSessionFormData>({
    initialValues: {
      startTime: sessionData.startTime || "",
      endTime: sessionData.endTime || "",
      classRoom: sessionData.classRoom || "", 
      staffId: sessionData.staffId?.toString() || "", 
      adminRemark: sessionData.administrationSummary || "",
      profRemark: sessionData.teacherSummary || "",
      timeZone: getUserTimezone(),
    },
    onSubmit: (values) => {
      const updateRequest = {
        staffId: values.staffId, 
        classRoomId: values.classRoom,
        timeStart: values.startTime, 
        timeClose: values.endTime, 
        teacherSummary: values.profRemark,
        administrationSummary: values.adminRemark,
        timeZone: getUserTimezone(), 
      };

      updateSession(
        {
          sessionDateId: sessionData.sessionDateId,
          request: updateRequest,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={6} align="stretch">
          <HStack spacing={4} align="stretch" height="100%">
            <UpdateSessionInfoCard
              cardBg={cardBg}
              formik={formik}
              sessionData={sessionData}
              staffOptions={staffOptions}
            />

            <RemarksCard cardBg={cardBg} formik={formik} />
          </HStack>

          <HStack justify="flex-end" spacing={3}>
            <Button variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isPending}
              loadingText="Updating..."
              disabled={!formik.dirty || !formik.isValid}
            >
              Update Session
            </Button>
          </HStack>
        </VStack>
      </form>
    </FormikProvider>
  );
};

export default UpdateSessionScheduleDate;
