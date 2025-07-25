import type { ModuleItem } from "@/types/menuItem";


//  ALL: FaThLarge,
//     ENROLLMENT: FaUserGraduate,
//     HUMAN_RESOURCES: FaChalkboardTeacher,
//     ATTENDANCE: FaClipboardList,
//     TIMETABLE: FaCalendarAlt,
//     EDUCATION: FaBookOpen,
//     GRADES: FaClipboardList,
//     LEARNING_HUB: FaBookOpen,
//     FINANCE: FaMoneyCheckAlt,
//     TRANSPORT: FaBusAlt,
//     NOTIFICATIONS: FaBell,
//     PARTNER: FaHandshake,
//     EVENTS: FaCalendarAlt,
//     ONLINE_CLASSES: FaLaptop,
//     COMMUNICATION: FaComments,
//     SETTINGS: FaCogs,

export const fakeModules: ModuleItem[] = [
    { id: 9, module_code: "ALL", module_name: "All", module_icon: "FaThLarge" },
    { id: 1, module_code: "ENROLLMENT", module_name: "Enrollment", module_icon: "FaUserGraduate" },
    { id: 2, module_code: "FINANCE", module_name: "Finance", module_icon: "FaMoneyCheckAlt" },
    { id: 3, module_code: "EDUCATION", module_name: "Education", module_icon: "FaBookOpen" },
    { id: 4, module_code: "HUMAN_RESOURCES", module_name: "Human resources", module_icon: "FaChalkboardTeacher" },
    { id: 5, module_code: "COMMUNICATION", module_name: "Communication", module_icon: "FaComments" },
    { id: 6, module_code: "PARTNER", module_name: "Partner", module_icon: "FaHandshake" },
    { id: 7, module_code: "LEARNING_HUB", module_name: "Library", module_icon: "FaBookOpen" },
    { id: 8, module_code: "SETTINGS", module_name: "Settings", module_icon: "FaCogs" },
];

