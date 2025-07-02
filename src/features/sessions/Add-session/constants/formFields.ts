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
      name: "generalLevels",
      label: "Category",
      type: "radio",
      validationRules: { required: true },
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
    {
      name: "classRoomId",
      label: "Room",
      type: "select",
      validationRules: { required: true },
    },
  ],
};

// Helper function to get the earliest start date from academic periods
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
  const mapCategoryName = (name: string): "" | "Foundation" | "Linguistic" => {
    const normalizedName = name.toLowerCase();
    if (normalizedName.includes('foundation')) {
      return "Foundation";
    } else if (normalizedName.includes('linguistic')) {
      return "Linguistic";
    }
    return ""; 
  };
  
  const defaultCategoryName = firstCategory ? mapCategoryName(firstCategory.name) : "";

  return {
    categoryId: defaultCategoryId,
    levelSubjectId: 0,
    staffId: "",
    associationId: 0,
    periodicity: "WEEKLY",
    sessionType: "ONLINE", 
    startDate: getStartDate(academicPeriods),
    endDate: "",
    maxStudentsCapacity: 1,
    fees: 0,
    generalLevels: defaultCategoryName,
    sessionSchedules: [
      {
        classRoomId: 0,
        sessionName: "",
        day: "MONDAY", 
        startTime: "09:00", 
        endTime: "10:00"
      },
    ],
    studentIds: [],
  };
};

export const initialValues: SessionFormData = {
  categoryId: 0,
  levelSubjectId: 0,
  staffId: "",
  associationId: 0,
  periodicity:"WEEKLY",
  sessionType: "" as 'ONLINE' | 'ONSITE',
  startDate: "",
  endDate: "",
  maxStudentsCapacity: 0,
  fees: 0,
  generalLevels: "",
  sessionSchedules: [
    {
      classRoomId: 0,
      sessionName: "",
      day: "",
      startTime: "",
      endTime: "",
    },
  ],
  studentIds: [],
};