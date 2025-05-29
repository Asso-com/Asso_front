import type { MenuItem } from "../../../../types/menuItem";

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
        MENU_DESCRIPTION: "Sessions",
        icon: "FaRegCalendarAlt",
        NAVLINK: "",
        children: [
            {
                MENU_ID: 51,
                MENU_DESCRIPTION: "Session",
                NAVLINK: "/Sessions/listPrograms",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 52,
                MENU_DESCRIPTION: "Add Session",
                NAVLINK: "/Sessions/AddProgram",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 53,
                MENU_DESCRIPTION: "Add Student Session",
                NAVLINK: "/Sessions/AddStudentProgram",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 54,
                MENU_DESCRIPTION: "List Student Session",
                NAVLINK: "/Sessions/listStudentProgram",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 55,
                MENU_DESCRIPTION: "Sessions Consultation",
                NAVLINK: "/Sessions/SessionsConsultation",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 56,
                MENU_DESCRIPTION: "Attendance Tracking",
                NAVLINK: "/Sessions/AttendanceTracking",
                icon: "FaHome",
            },
            {
                MENU_ID: 57,
                MENU_DESCRIPTION: "Session Tracking",
                NAVLINK: "/Sessions/SessionSchedule",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
  
    {
        MENU_ID: 6,
        MENU_DESCRIPTION: "Lesson Plan",
        icon: "FaListAlt",
        NAVLINK: "",
        children: [
          
            {
                MENU_ID: 61,
                MENU_DESCRIPTION: "Lesson",
                NAVLINK: "/LessonPlan/Lesson",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 62,
                MENU_DESCRIPTION: "Topic",
                NAVLINK: "/LessonPlan/Topic",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 7,
        MENU_DESCRIPTION: "Academics",
        icon: "FaGraduationCap",
        NAVLINK: "",
        children: [
            {
                MENU_ID: 71,
                MENU_DESCRIPTION: "Level",
                NAVLINK: "/Academics/listClass",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 72,
                MENU_DESCRIPTION: "Subject",
                NAVLINK: "/Academics/listSubject",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 73,
                MENU_DESCRIPTION: "Subject Level",
                NAVLINK: "/Academics/SubjectGroup",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 74,
                MENU_DESCRIPTION: "Linguistic Level",
                NAVLINK: "/Academics/linguisticLevel",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 75,
                MENU_DESCRIPTION: "Room",
                NAVLINK: "/Academics/roomAddress",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 76,
                MENU_DESCRIPTION: "Subject Type",
                NAVLINK: "/Academics/subjectType",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 8,
        MENU_DESCRIPTION: "Human Resource",
        icon: "FaUsersCog",
        NAVLINK: "",
        children: [
            {
                MENU_ID: 81,
                MENU_DESCRIPTION: "Staff List",
                NAVLINK: "/HumanResource/listStaff",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 82,
                MENU_DESCRIPTION: "Add Staff",
                NAVLINK: "/HumanResource/addStaff",
                icon: "FaAngleDoubleRight",
            },
          
            {
                MENU_ID: 83,
                MENU_DESCRIPTION: "Department",
                NAVLINK: "/HumanResource/ListDepartment",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 84,
                MENU_DESCRIPTION: "Staff Attendance",
                NAVLINK: "/HumanResource/StaffAttendance",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 9,
        MENU_DESCRIPTION: "Communicate",
        icon: "FaCommentDots",
        NAVLINK: "",
        children: [
            {
                MENU_ID: 91,
                MENU_DESCRIPTION: "Message",
                NAVLINK: "/Communicate/Message",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 92,
                MENU_DESCRIPTION: "Send Email",
                NAVLINK: "/Communicate/SendEmail",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 93,
                MENU_DESCRIPTION: "Annonces",
                NAVLINK: "/Communicate/Annonce",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 100,
        MENU_DESCRIPTION: "Quiz",
        icon: "FaQuestion",
        NAVLINK: "",
        children: [
            {
                MENU_ID: 101,
                MENU_DESCRIPTION: "Add Quiz",
                NAVLINK: "/Quiz/AddQuiz",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 102,
                MENU_DESCRIPTION: "List Of Quiz",
                NAVLINK: "/Quiz/ListOfQuiz",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 101,
        MENU_DESCRIPTION: "Partner",
        icon: "FaRegHandshake",
        NAVLINK: "",
        children: [
            {
                MENU_ID: 110,
                MENU_DESCRIPTION: "List of Partners",
                NAVLINK: "/Partnerlocation/listPartner",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 111,
                MENU_DESCRIPTION: "Partner Location",
                NAVLINK: "/Partnerlocation/location",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
   
    {
        MENU_ID: 102,
        MENU_DESCRIPTION: "Library",
        icon: "FaBookReader",
        NAVLINK: "",
        children: [
            {
                MENU_ID: 120,
                MENU_DESCRIPTION: "Book List",
                NAVLINK: "/Library/BookList",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 121,
                MENU_DESCRIPTION: "Add a Book",
                NAVLINK: "/Library/addBook",
                icon: "FaAngleDoubleRight",
            },
        ],
    },

    {
        MENU_ID: 103,
        MENU_DESCRIPTION: "Events",
        icon: "FaRegCalendarCheck",
        NAVLINK: "",
        children: [
            {
                MENU_ID: 130,
                MENU_DESCRIPTION: "Add Event",
                NAVLINK: "/Events/AddEvent",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 131,
                MENU_DESCRIPTION: "Events List",
                NAVLINK: "/Events/EventList",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
    {
        MENU_ID: 104,
        MENU_DESCRIPTION: "System Settings",
        icon: "FaCog",
        NAVLINK: "",
        children: [
            {
                MENU_ID: 140,
                MENU_DESCRIPTION: "General Setting",
                NAVLINK: "/Settings/GeneralSetting",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 141,
                MENU_DESCRIPTION: "School Year Setting",
                NAVLINK: "/Settings/SessionSetting",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 142,
                MENU_DESCRIPTION: "Email Setting",
                NAVLINK: "/Settings/EmailSettings",
                icon: "FaAngleDoubleRight",
            },
            {
                MENU_ID: 143,
                MENU_DESCRIPTION: "Attendance Type",
                NAVLINK: "/Settings/listAttendanceType",
                icon: "FaAngleDoubleRight",
            },
        ],
    },
];

export default fakeMenuItems;