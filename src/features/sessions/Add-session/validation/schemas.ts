import * as Yup from "yup";
import { validateDateWithinAcademicPeriods } from "./validators";

const transformNumber = (value: any, originalValue: any) => {
  if (originalValue === '' || originalValue == null) return undefined;
  const num = Number(originalValue);
  return isNaN(num) ? undefined : num;
};

export const createFullInfoSchema = (academicPeriods: any[] = []) =>
  Yup.object({
 generalLevels: Yup.string()
  .test("log-generalLevels", function (value) {
    console.log("🧪 generalLevels checked:", value);
    return true; // juste pour logger
  })
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
      .test("after-start-date", "End date must be after start date", function (endDate) {
        const { startDate } = this.parent;
        if (!startDate || !endDate) return true;
        return new Date(endDate) > new Date(startDate);
      }),

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
      sessionName: Yup.string().required("Session name is required"),

      classRoomId: Yup.number()
        .required("Room is required")
        .min(1, "Room is required"),

      day: Yup.string().required("Day is required"),

      startTime: Yup.string()
        .required("Start time is required"),

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

  .test(
  "no-overlapping-times",
  "",
  function (sessions) {
    if (!Array.isArray(sessions)) return true;

    for (let i = 0; i < sessions.length; i++) {
      const sessionA = sessions[i];
      if (!sessionA.startTime || !sessionA.endTime || !sessionA.day) continue;

      const [startA_h, startA_m] = sessionA.startTime.split(":").map(Number);
      const [endA_h, endA_m] = sessionA.endTime.split(":").map(Number);
      const startA = startA_h * 60 + startA_m;
      const endA = endA_h * 60 + endA_m;

      for (let j = i + 1; j < sessions.length; j++) {
        const sessionB = sessions[j];
        if (!sessionB.startTime || !sessionB.endTime || !sessionB.day) continue;

        // ⚠️ Compare only if on the same day
        if (sessionA.day !== sessionB.day) continue;

        const [startB_h, startB_m] = sessionB.startTime.split(":").map(Number);
        const [endB_h, endB_m] = sessionB.endTime.split(":").map(Number);
        const startB = startB_h * 60 + startB_m;
        const endB = endB_h * 60 + endB_m;

        const isOverlapping = startA < endB && startB < endA;
        if (isOverlapping) {
          const message = `Sessions ${i + 1} and ${j + 1} on the same day (${sessionA.day}) have overlapping times`;
          return this.createError({
            path: `${this.path}`,
            message,
          });
        }
      }
    }

    return true;
  }
),




  
    studentIds: Yup.array().of(Yup.string()),
  });
