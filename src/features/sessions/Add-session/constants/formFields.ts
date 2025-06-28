import type { Field,SessionFormData} from "../types/addsession.types";


export const formFields: { basicInfo: Field[]; schedule: Field[] } = {
  basicInfo: [
    {
      name: "generalLevels",
      label: "Category",
      type: "radio",
      options: [
        { label: "Fundamentals", value: "Fundamentals" },
        { label: "Linguistic", value: "Linguistic" },
      ],
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
        { label: "Face to Face", value: "FACE_TO_FACE" },
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
      name: "sessionName",
      label: "Session Name",
      type: "text",
      validationRules: { required: true },
      placeholder: "Enter session name",
    },
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
      placeholder: "HH:MM",
    },
    {
      name: "endTime",
      label: "End Time",
      type: "time",
      validationRules: { required: true },
      placeholder: "HH:MM",
    },
    {
      name: "classRoomId",
      label: "Room",
      type: "select",
      validationRules: { required: true },
    },
  ],
};

export const initialValues: SessionFormData = {
  levelSubjectId: 0,
  staffId: "",
  staffEmail: "",
  associationId: 0,
  periodicity: "WEEKLY",
  sessionType: "ONLINE",
  startDate: "",
  endDate: "",
  maxStudentsCapacity: 0,
  placesAvailable: 0,
  fees: 0,
  sessions: [
    {
      sessionName: "",
      classRoomId: 0,
      day: "",
      startTime: "",
      endTime: "",
    },
  ],
  students: [],
};