import type { Field, SessionFormData } from "../types/addsession.types";

interface AcademicPeriodWeek {
  id: number;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  active: boolean;
  dayOfWeek: string;
  numberOfWeeks: number;
}

export const formFields: { basicInfo: Field[]; schedule: Field[] } = {
  basicInfo: [
{
  name: "categoryId",
  label: "Category",
  type: "radio",
  validationRules: { required: true },
  options: [],
},
    {
      name: "levelSubjectId",
      label: "Subject Level",
      type: "select",
      validationRules: { required: true },
    },
    {
      name: "staffId",
      label: "Teacher",
      type: "select",
      validationRules: { required: true },
    },
    {
      name: "periodicity",
      label: "Periodicity",
      type: "radio",
      options: [
        { label: "Weekly", value: "WEEKLY" },
        { label: "Monthly", value: "MONTHLY" },
      ],
      validationRules: { required: true },
    },
    {
      name: "sessionType",
      label: "Session Type",
      type: "radio",
      options: [
        { label: "Online", value: "ONLINE" },
        { label: "Onsite", value: "ONSITE" },
      ],
      validationRules: { required: true },
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      validationRules: { required: true },
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      validationRules: {
        required: true,
        isAfter: { field: "startDate" },
      },
    },
    {
      name: "maxStudentsCapacity",
      label: "Capacity",
      type: "number",
      validationRules: { required: true, min: 1 },
      placeholder: "Enter capacity",
    },
    {
      name: "fees",
      label: "Fees",
      type: "number",
      validationRules: { required: true, min: 0 },
      placeholder: "Enter fees",
    },
  ],
  schedule: [
    {
      name: "day",
      label: "Day",
      type: "select",
      options: [
        { label: "Monday", value: "MONDAY" },
        { label: "Tuesday", value: "TUESDAY" },
        { label: "Wednesday", value: "WEDNESDAY" },
        { label: "Thursday", value: "THURSDAY" },
        { label: "Friday", value: "FRIDAY" },
        { label: "Saturday", value: "SATURDAY" },
        { label: "Sunday", value: "SUNDAY" },
      ],
      validationRules: { required: true },
    },
    {
      name: "classRoomId",
      label: "Room",
      type: "select",
      validationRules: { required: true },
    },
        {
      name: "sessionType",
      label: "Session Type",
      type: "radio",
      options: [
        { label: "Online", value: "ONLINE" },
        { label: "Onsite", value: "ONSITE" },
      ],
      validationRules: { required: true },
    },
    
    {
      name: "startTime",
      label: "Start Time",
      type: "time",
      validationRules: { required: true },
      placeholder: "HH:MM:SS",
    },
    {
      name: "endTime",
      label: "End Time",
      type: "time",
      validationRules: { required: true },
      placeholder: "HH:MM:SS",
    },
  ],
};

const getActivePeriodEndDate = (academicPeriods: AcademicPeriodWeek[]): string => {
  const activePeriod = academicPeriods.find((p) => p.active);
  if (!activePeriod) return "";
  return new Date(activePeriod.endDate).toISOString().split("T")[0];
};
const getStartDate = (academicPeriods: AcademicPeriodWeek[]): string => {
  if (!academicPeriods.length) return "";
  const minDate = new Date(
    Math.min(...academicPeriods.map((p) => new Date(p.startDate).getTime()))
  );
  return minDate.toISOString().split("T")[0];
};
export const createInitialValues = (
  academicPeriods: AcademicPeriodWeek[] = [],
  categories: Array<{ name: string; id: number | string }> = []
): SessionFormData => {
  const firstCategory = categories[0];
  const defaultCategoryId = firstCategory ? Number(firstCategory.id) : 0;


  return {
    categoryId: defaultCategoryId,
    levelSubjectId: 0,
    staffId: "",
    associationId: 0,
    periodicity: "WEEKLY",
    sessionType: "ONLINE",
    startDate: getStartDate(academicPeriods),
    endDate: getActivePeriodEndDate(academicPeriods),
    maxStudentsCapacity: 1,
    fees: 0,
    timeZone:"", 
    sessionSchedules: [
     /* {
        classRoomId: 0,
        day: "MONDAY",
        sessionType: "ONLINE",
        startTime: "09:00",
        endTime: "10:00",
      },*/
    ],
    studentIds: [],
  };
};
