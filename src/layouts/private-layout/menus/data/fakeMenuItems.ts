import type { MenuItem } from "../../../../types/menuItem";
/**
 * 
 * 
 * 
 * export const fakeModules: ModuleItem[] = [
     { ID: 1, MODULE: "ENROLLMENT", MENU_DESCRIPTION: "Enrollment" },
     { ID: 2, MODULE: "FINANCE", MENU_DESCRIPTION: "Finance" },
     { ID: 3, MODULE: "EDUCATION", MENU_DESCRIPTION: "Education" },
     { ID: 4, MODULE: "HUMAN_RESOURCES", MENU_DESCRIPTION: "Human resources" },
     { ID: 5, MODULE: "COMMUNICATION", MENU_DESCRIPTION: "Communication" },
     { ID: 6, MODULE: "PARTNER", MENU_DESCRIPTION: "Partner" },
     { ID: 7, MODULE: "LIBRARY", MENU_DESCRIPTION: "Library" },
     { ID: 8, MODULE: "SETTINGS", MENU_DESCRIPTION: "Settings" },
     { ID: 9, MODULE: "ALL", MENU_DESCRIPTION: "All" },
 ];


 */
const fakeMenuItems: MenuItem[] = [
    {
        MENU_ID: 1,
        MENU_DESCRIPTION: "Dashboard",
        NAVLINK: "/dashboard",
        icon: "FaHome",
        children: [],
    },
    {
        MENU_ID: 4,
        MENU_DESCRIPTION: "Student Information",
        icon: "FaUserGraduate",
        NAVLINK: "",
        MODULE_CODE: "ENROLLMENT",
        // MODULE: "ENROLLMENT"
        children: [
            {
                MENU_ID: 41,
                MENU_DESCRIPTION: "Student Details",
                NAVLINK: "/Student/StudentInformation",
                icon: "FaAngleDoubleRight",

            },
            {
                MENU_ID: 42,
                MENU_DESCRIPTION: "Student Registration",
                NAVLINK: "/Student/AddStudent",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 43,
                MENU_DESCRIPTION: "Location of Student",
                NAVLINK: "/Student/GeographicalLocationofStudentAddresses",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 44,
                MENU_DESCRIPTION: "Linguistic Levels Registration",
                NAVLINK: "/Student/LinguisticLevelsRegistration",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 45,
                MENU_DESCRIPTION: "Payments",
                NAVLINK: "/Student/Payments",
                icon: "FaWallet",
            },
        ],
    },
    {
        MENU_ID: 5,
        MENU_DESCRIPTION: "Finance",
        icon: "FaMoneyBillWave",
        NAVLINK: "",
        MODULE_CODE: "FINANCE",
        children: [
            {
                MENU_ID: 50,
                MENU_DESCRIPTION: "Fees Structure",
                NAVLINK: "/Finance/FeesStructure",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 51,
                MENU_DESCRIPTION: "Student Payments",
                NAVLINK: "/Finance/StudentPayments",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 52,
                MENU_DESCRIPTION: "Teacher Payments",
                NAVLINK: "/Finance/TeacherPayments",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 53,
                MENU_DESCRIPTION: "Payment History",
                NAVLINK: "/Finance/PaymentHistory",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 54,
                MENU_DESCRIPTION: "Invoices",
                NAVLINK: "/Finance/Invoices",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 55,
                MENU_DESCRIPTION: "Financial Reports",
                NAVLINK: "/Finance/FinancialReports",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 56,
                MENU_DESCRIPTION: "Expenses",
                NAVLINK: "/Finance/Expenses",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 6,
        MENU_DESCRIPTION: "Sessions",
        icon: "FaRegCalendarAlt",
        NAVLINK: "",
        MODULE_CODE: "EDUCATION",
        children: [
            {
                MENU_ID: 61,
                MENU_DESCRIPTION: "List Sessions",
                NAVLINK: "/Sessions/listSessions",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 62,
                MENU_DESCRIPTION: "Add Session",
                NAVLINK: "/Sessions/AddSession",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 63,
                MENU_DESCRIPTION: "Add Student Session",
                NAVLINK: "/Sessions/AddStudentSession",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 64,
                MENU_DESCRIPTION: "List Student Session",
                NAVLINK: "/Sessions/listStudentSession",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 65,
                MENU_DESCRIPTION: "Sessions Consultation",
                NAVLINK: "/Sessions/SessionsConsultation",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 66,
                MENU_DESCRIPTION: "Attendance Tracking",
                NAVLINK: "/Sessions/AttendanceTracking",
                icon: "FaHome",
            },
            {
                MENU_ID: 67,
                MENU_DESCRIPTION: "Session Tracking",
                NAVLINK: "/Sessions/SessionSchedule",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 7,
        MENU_DESCRIPTION: "Lesson Plan",
        icon: "FaListAlt",
        NAVLINK: "",
        MODULE_CODE: "EDUCATION",
        children: [
            {
                MENU_ID: 71,
                MENU_DESCRIPTION: "Lesson",
                NAVLINK: "/LessonPlan/Lesson",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 72,
                MENU_DESCRIPTION: "Topic",
                NAVLINK: "/LessonPlan/Topic",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 8,
        MENU_DESCRIPTION: "Academics",
        icon: "FaGraduationCap",
        NAVLINK: "",
        MODULE_CODE: "EDUCATION",
        children: [
            {
                MENU_ID: 81,
                MENU_DESCRIPTION: "Level",
                NAVLINK: "/Academics/listLevel",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 82,
                MENU_DESCRIPTION: "Subject",
                NAVLINK: "/Academics/listSubject",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 83,
                MENU_DESCRIPTION: "Subject Level",
                NAVLINK: "/Academics/SubjectLevel",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 84,
                MENU_DESCRIPTION: "Linguistic Level",
                NAVLINK: "/Academics/linguisticLevel",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 85,
                MENU_DESCRIPTION: "Room",
                NAVLINK: "/Academics/ClassRoom",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 86,
                MENU_DESCRIPTION: "Subject Type",
                NAVLINK: "/Academics/subjectType",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 9,
        MENU_DESCRIPTION: "Human Resource",
        icon: "FaUsersCog",
        NAVLINK: "",
        MODULE_CODE: "HUMAN_RESOURCES",
        children: [
            {
                MENU_ID: 91,
                MENU_DESCRIPTION: "Staff List",
                NAVLINK: "/HumanResource/listStaff",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 92,
                MENU_DESCRIPTION: "Add Staff",
                NAVLINK: "/HumanResource/addStaff",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 93,
                MENU_DESCRIPTION: "Department",
                NAVLINK: "/HumanResource/ListDepartment",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 94,
                MENU_DESCRIPTION: "Staff Attendance",
                NAVLINK: "/HumanResource/StaffAttendance",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 10,
        MENU_DESCRIPTION: "Communicate",
        icon: "FaCommentDots",
        NAVLINK: "",
        MODULE_CODE: "COMMUNICATION",
        children: [
            {
                MENU_ID: 101,
                MENU_DESCRIPTION: "Message",
                NAVLINK: "/Communicate/Message",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 102,
                MENU_DESCRIPTION: "Send Email",
                NAVLINK: "/Communicate/SendEmail",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 103,
                MENU_DESCRIPTION: "Annonces",
                NAVLINK: "/Communicate/Annonce",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 11,
        MENU_DESCRIPTION: "Quiz",
        icon: "FaQuestion",
        NAVLINK: "",
        MODULE_CODE: "EDUCATION",
        children: [
            {
                MENU_ID: 111,
                MENU_DESCRIPTION: "Add Quiz",
                NAVLINK: "/Quiz/AddQuiz",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 112,
                MENU_DESCRIPTION: "List Of Quiz",
                NAVLINK: "/Quiz/ListOfQuiz",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 12,
        MENU_DESCRIPTION: "Partner",
        icon: "FaRegHandshake",
        NAVLINK: "",
        MODULE_CODE: "PARTNER",
        children: [
            {
                MENU_ID: 121,
                MENU_DESCRIPTION: "List of Partners",
                NAVLINK: "/Partner/listPartner",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 122,
                MENU_DESCRIPTION: "Partner Location",
                NAVLINK: "/Partner/location",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 13,
        MENU_DESCRIPTION: "Library",
        icon: "FaBookReader",
        NAVLINK: "",
        MODULE_CODE: "LIBRARY",
        children: [
            {
                MENU_ID: 131,
                MENU_DESCRIPTION: "Book List",
                NAVLINK: "/Library/BookList",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 132,
                MENU_DESCRIPTION: "Add a Book",
                NAVLINK: "/Library/addBook",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 14,
        MENU_DESCRIPTION: "Events",
        icon: "FaRegCalendarCheck",
        NAVLINK: "",
        MODULE_CODE: "COMMUNICATION",
        children: [
            {
                MENU_ID: 141,
                MENU_DESCRIPTION: "Add Event",
                NAVLINK: "/Events/AddEvent",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 142,
                MENU_DESCRIPTION: "Events List",
                NAVLINK: "/Events/EventList",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 15,
        MENU_DESCRIPTION: "System Settings",
        icon: "FaCog",
        NAVLINK: "",
        MODULE_CODE: "SETTINGS",
        children: [
            {
                MENU_ID: 151,
                MENU_DESCRIPTION: "General Setting",
                NAVLINK: "/Settings/GeneralSetting",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 152,
                MENU_DESCRIPTION: "School Year Setting",
                NAVLINK: "/Settings/SessionSetting",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 152,
                MENU_DESCRIPTION: "Academic Period Weeks",
                NAVLINK: "/Settings/AcademicPeriodWeeks",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 154,
                MENU_DESCRIPTION: "Email Setting",
                NAVLINK: "/Settings/EmailSettings",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 155,
                MENU_DESCRIPTION: "Attendance Type",
                NAVLINK: "/Settings/listAttendanceType",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
];

export default fakeMenuItems;