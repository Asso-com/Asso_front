import type { MenuItem } from "../../../../types/menuItem";

const fakeMenuItems: MenuItem[] = [
    {
        MENU_ID: 1,
        MENU_DESCRIPTION: "Dashboard",
        NAVLINK: "/dashboard",
        icon: "FaBox",
        children: [],
    },
    {
        MENU_ID: 2,
        MENU_DESCRIPTION: "Management",
        icon: "FaTachometerAlt",
        NAVLINK: "",
        children: [
            {
                MENU_ID: 21,
                MENU_DESCRIPTION: "Users",
                NAVLINK: "/management/users",
                icon: "MdPerson",
            },
            {
                MENU_ID: 22,
                MENU_DESCRIPTION: "Roles",
                NAVLINK: "/management/roles",
                icon: "MdSecurity",
            },
        ],
    },
    {
        MENU_ID: 3,
        MENU_DESCRIPTION: "Reports",
        icon: "FaChartBar",
        NAVLINK: "",
        children: [
            {
                MENU_ID: 31,
                MENU_DESCRIPTION: "Sales Report",
                NAVLINK: "/reports/sales",
                icon: "MdBarChart",
            },
            {
                MENU_ID: 32,
                MENU_DESCRIPTION: "Finance Report",
                NAVLINK: "/reports/finance",
                icon: "MdPieChart",
            },
        ],
    },
];
export default fakeMenuItems;