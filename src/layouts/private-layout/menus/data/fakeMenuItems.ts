import type { MenuItem } from "../../../../types/menuItem";

const fakeMenuItems: MenuItem[] = [
  {
    menu_id: 1,
    menu_description: "Dashboard",
    navLink: "/dashboard",
    icon: "FaHome",
    children: [],
  },
  {
    menu_id: 4,
    menu_description: "Student Information",
    icon: "FaUserGraduate",
    navLink: "",
    module_code: "ENROLLMENT",
    children: [
      {
        menu_id: 41,
        menu_description: "Student Details",
        navLink: "/Student/StudentInformation",
        icon: "FaAngleDoubleRight",

      },
      {
        menu_id: 43,
        menu_description: "Location of Student",
        navLink: "/Student/GeographicalLocationofStudentAddresses",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 44,
        menu_description: "Not Academic Enrollments",
        navLink: "/Student/LinguisticLevelsRegistration",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 45,
        menu_description: "Payments",
        navLink: "/Student/Payments",
        icon: "FaWallet",
      },
    ],
  },
  {
    menu_id: 16,
    menu_description: "Family Information",
    icon: "FaUsers",
    navLink: "",
    module_code: "ENROLLMENT",
    children: [
      {
        menu_id: 55,
        menu_description: "Family Details",
        navLink: "/families",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 56,
        menu_description: "Family meetings List",
        navLink: "/list-reu-families",
        icon: "FaAngleDoubleRight",
      },
    ],
  },
  {
    menu_id: 5,
    menu_description: "Finance",
    icon: "FaMoneyBillWave",
    navLink: "",
    module_code: "FINANCE",
    children: [
      {
        menu_id: 50,
        menu_description: "Fees Structure",
        navLink: "/Finance/FeesStructure",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 51,
        menu_description: "Student Payments",
        navLink: "/Finance/StudentPayments",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 52,
        menu_description: "Teacher Payments",
        navLink: "/Finance/TeacherPayments",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 53,
        menu_description: "Payment History",
        navLink: "/Finance/PaymentHistory",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 54,
        menu_description: "Invoices",
        navLink: "/Finance/Invoices",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 55,
        menu_description: "Financial Reports",
        navLink: "/Finance/FinancialReports",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 56,
        menu_description: "Expenses",
        navLink: "/Finance/Expenses",
        icon: "FaAngleDoubleRight",
      },
    ],
  },
  {
    menu_id: 6,
    menu_description: "Sessions",
    icon: "FaRegCalendarAlt",
    navLink: "",
    module_code: "EDUCATION",
    children: [
      {
        menu_id: 61,
        menu_description: "List Sessions",
        navLink: "/Sessions/listSessions",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 62,
        menu_description: "Add Session",
        navLink: "/Sessions/AddSession",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 64,
        menu_description: "List Student Session",
        navLink: "/Sessions/listStudentSession",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 65,
        menu_description: "Sessions Consultation",
        navLink: "/Sessions/SessionsConsultation",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 66,
        menu_description: "Attendance Tracking",
        navLink: "/Sessions/AttendanceTracking",
        icon: "FaHome",
      },
      {
        menu_id: 67,
        menu_description: "Session Tracking",
        navLink: "/Sessions/SessionSchedule",
        icon: "FaAngleDoubleRight",
      },
    ],
  },
  {
    menu_id: 7,
    menu_description: "Lesson Plan",
    icon: "FaListAlt",
    navLink: "",
    module_code: "EDUCATION",
    children: [
      {
        menu_id: 71,
        menu_description: "Lesson",
        navLink: "/LessonPlan/Lesson",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 72,
        menu_description: "Topic",
        navLink: "/LessonPlan/Topic",
        icon: "FaAngleDoubleRight",
      },
    ],
  },
  {
    menu_id: 8,
    menu_description: "Academics",
    icon: "FaGraduationCap",
    navLink: "",
    module_code: "EDUCATION",
    children: [

      {
        menu_id: 80,
        menu_description: "Department",
        navLink: "/Academics/Department",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 81,
        menu_description: "Subject",
        navLink: "/Academics/listSubject",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 82,
        menu_description: "Categories of Levels",
        navLink: "/Academics/CategoriesLevels",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 83,
        menu_description: "Level",
        navLink: "/Academics/listLevel",
        icon: "FaAngleDoubleRight",
      },

      {
        menu_id: 84,
        menu_description: "Subject Level",
        navLink: "/Academics/SubjectLevel",
        icon: "FaAngleDoubleRight",
      },

      {
        menu_id: 85,
        menu_description: "Class Room",
        navLink: "/Academics/ClassRoom",
        icon: "FaAngleDoubleRight",
      },


    ],
  },
  {
    menu_id: 9,
    menu_description: "Human Resource",
    icon: "FaUsersCog",
    navLink: "",
    module_code: "HUMAN_RESOURCES",
    children: [
      {
        menu_id: 91,
        menu_description: "Staff List",
        navLink: "/HumanResource/listStaff",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 92,
        menu_description: "Add Staff",
        navLink: "/HumanResource/addStaff",
        icon: "FaAngleDoubleRight",
      },

      {
        menu_id: 93,
        menu_description: "Staff Attendance",
        navLink: "/HumanResource/StaffAttendance",
        icon: "FaAngleDoubleRight",
      },
    ],
  },
  {
    menu_id: 10,
    menu_description: "Communicate",
    icon: "FaCommentDots",
    navLink: "",
    module_code: "COMMUNICATION",
    children: [
      {
        menu_id: 101,
        menu_description: "Message",
        navLink: "/Communicate/Message",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 102,
        menu_description: "Send Email",
        navLink: "/Communicate/SendEmail",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 103,
        menu_description: "Annonces",
        navLink: "/Communicate/Annonce",
        icon: "FaAngleDoubleRight",
      },
    ],
  },
  {
    menu_id: 11,
    menu_description: "Quiz",
    icon: "FaQuestion",
    navLink: "",
    module_code: "EDUCATION",
    children: [
      {
        menu_id: 111,
        menu_description: "Add Quiz",
        navLink: "/Quiz/AddQuiz",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 112,
        menu_description: "List Of Quiz",
        navLink: "/Quiz/ListOfQuiz",
        icon: "FaAngleDoubleRight",
      },
    ],
  },
  {
    menu_id: 12,
    menu_description: "Partner",
    icon: "FaRegHandshake",
    navLink: "",
    module_code: "PARTNER",
    children: [
      {
        menu_id: 121,
        menu_description: "List of Associations",
        navLink: "/partner/associations",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 122,
        menu_description: "location of Associations",
        navLink: "/partner/associations/locations",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 200,
        menu_description: "List of Partners",
        navLink: "/partner/list",
        icon: "FaAngleDoubleRight",
      },
    ],
  },
  {
    menu_id: 13,
    menu_description: "Library",
    icon: "FaBookReader",
    navLink: "",
    module_code: "LIBRARY",
    children: [
      {
        menu_id: 131,
        menu_description: "Book List",
        navLink: "/Library/BookList",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 132,
        menu_description: "Add a Book",
        navLink: "/Library/addBook",
        icon: "FaAngleDoubleRight",
      },
    ],
  },
  {
    menu_id: 14,
    menu_description: "Events",
    icon: "FaRegCalendarCheck",
    navLink: "",
    module_code: "COMMUNICATION",
    children: [
      {
        menu_id: 141,
        menu_description: "Add Event",
        navLink: "/Events/AddEvent",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 142,
        menu_description: "Events List",
        navLink: "/Events/EventList",
        icon: "FaAngleDoubleRight",
      },
    ],
  },
  {
    menu_id: 15,
    menu_description: "System Settings",
    icon: "FaCog",
    navLink: "",
    module_code: "SETTINGS",
    children: [
      // {
      //   menu_id: 151,
      //   menu_description: "Coefficient Setting",
      //   navLink: "/Settings/CoefficientSetting",
      //   icon: "FaAngleDoubleRight",
      // },
      {
        menu_id: 152,
        menu_description: "School Year Setting",
        navLink: "/Settings/SessionSetting",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 152,
        menu_description: "Academic Period Weeks",
        navLink: "/Settings/AcademicPeriodWeeks",
        icon: "FaAngleDoubleRight",
      },
      {
        menu_id: 154,
        menu_description: "Email Setting",
        navLink: "/Settings/EmailSettings",
        icon: "FaAngleDoubleRight",
      },
            {
        menu_id: 155,
        menu_description: "Verification Codes",
        navLink: "/Settings/VerificationCodes",
        icon: "FaAngleDoubleRight",
      },

    ],
  },
];

export default fakeMenuItems;