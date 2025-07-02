import * as Yup from "yup";
import { validateDateWithinAcademicPeriods } from "./validators";

const transformNumber = (value: any, originalValue: any) => {
  if (originalValue === "" || originalValue == null) return undefined;
  const num = Number(originalValue);
  return isNaN(num) ? undefined : num;
};

export const createFullInfoSchema = (academicPeriods: any[] = []) =>
  Yup.object({
    generalLevels: Yup.string()
      .oneOf(["Foundation", "Linguistic"], "Please select a valid category")
      .required("Category is required"),

    levelSubjectId: Yup.number()
      .transform(transformNumber)
      .min(1, "Subject level is required")
      .required("Subject level is required"),

    staffId: Yup.string()
      .min(1, "Teacher is required")
      .required("Teacher is required"),

    periodicity: Yup.string()
      .oneOf(["WEEKLY", "MONTHLY"], "Please select a valid periodicity")
      .required("Periodicity is required"),

    sessionType: Yup.string()
      .oneOf(["ONLINE", "ONSITE"], "Please select a valid session type")
      .required("Session type is required"),

    startDate: Yup.string()
      .required("Start date is required")
      .test(
        "within-academic-period",
        "Start date must be within the active academic period",
        validateDateWithinAcademicPeriods(academicPeriods)
      ),

    endDate: Yup.string()
      .required("End date is required")
      .test(
        "within-academic-period",
        "End date must be within the active academic period",
        validateDateWithinAcademicPeriods(academicPeriods)
      )
      .test(
        "after-start-date",
        "End date must be after start date",
        function (endDate) {
          const { startDate } = this.parent;
          if (!startDate || !endDate) return true;
          return new Date(endDate) > new Date(startDate);
        }
      ),

    maxStudentsCapacity: Yup.number()
      .transform(transformNumber)
      .min(1, "Capacity must be at least 1")
      .required("Capacity is required"),

    fees: Yup.number()
      .transform(transformNumber)
      .min(1, "Fees must be greater than 0")
      .required("Fees is required"),

    sessionSchedules: Yup.array()
      .of(
        Yup.object({
          classRoomId: Yup.number()
            .required("Room is required")
            .min(1, "Room is required"),

          day: Yup.string().required("Day is required"),

          startTime: Yup.string().required("Start time is required"),

          endTime: Yup.string()
            .required("End time is required")
            .test(
              "is-after-startTime",
              "End time must be after start time",
              function (endTime) {
                const { startTime } = this.parent;
                if (!startTime || !endTime) return true;

                const [startH, startM] = startTime.split(":").map(Number);
                const [endH, endM] = endTime.split(":").map(Number);

                const startMinutes = startH * 60 + startM;
                const endMinutes = endH * 60 + endM;

                return endMinutes > startMinutes;
              }
            ),
        })
      )
      .min(1, "At least one session schedule is required")
      .test("no-overlapping-times", "", function (sessions) {
        if (!Array.isArray(sessions)) return true;
        const toMinutes = (time: string) => {
          const [h, m] = time.split(":").map(Number);
          return h * 60 + m;
        };
        for (let i = 0; i < sessions.length; i++) {
          const s1 = sessions[i];
          if (!s1.startTime || !s1.endTime || !s1.day) continue;
          const start1 = toMinutes(s1.startTime);
          const end1 = toMinutes(s1.endTime);
          for (let j = i + 1; j < sessions.length; j++) {
            const s2 = sessions[j];
            if (!s2.startTime || !s2.endTime || s2.day !== s1.day) continue;
            const start2 = toMinutes(s2.startTime);
            const end2 = toMinutes(s2.endTime);
            if (start1 < end2 && start2 < end1) {
              return this.createError({
                path: this.path,
                message: `Sessions ${i + 1} and ${j + 1} on the same day (${
                  s1.day
                }) have overlapping times.`,
              });
            }
          }
        }

        return true;
      }),

    studentIds: Yup.array()
      .of(Yup.string())
      .test(
        "max-capacity",
        "Selected students exceed the maximum capacity",
        function (studentIds) {
          const { maxStudentsCapacity } = this.parent;
          if (!studentIds) return true;
          return studentIds.length <= maxStudentsCapacity;
        }
      ),
  });
