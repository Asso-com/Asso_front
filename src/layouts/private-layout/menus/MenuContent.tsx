import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text, HStack, Icon } from "@chakra-ui/react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { motion } from "framer-motion";
import GetIconComponent from "./getIconComponent";
import NavItem from "./NavItem";
import "./menus_styles.css";

import type { MenuItem } from "../../../types/menuItem";

// export interface MenuItem {
//   MENU_ID: number;
//   MENU_DESCRIPTION: string;
//   NAVLINK?: string;
//   icon: string;
//   children?: MenuItem[];
//   EDITABLE?: number;
// }

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

const MotionBox = motion(Box);

const SidebarContent: React.FC = () => {
  const menuItems = fakeMenuItems;
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const location = useLocation();

  // Assume these come from context or i18n hooks
  const isRTL = false;
  const t = (text: string) => text;

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.children && isGroupActive(item.children)) {
        setActiveGroup(item.MENU_ID);
      }
    });
  }, [location.pathname]);

  const handleGroupClick = (groupId: number) => {
    setActiveGroup(activeGroup === groupId ? null : groupId);
  };

  const isGroupActive = (children: MenuItem[]) => {
    return children.some((child) => location.pathname === child.NAVLINK);
  };

  return (
    <Box p={2}>
      {menuItems.map((item, index) => {
        const IconComponent = GetIconComponent(item.icon);
        const hasChildren = item.children && item.children.length > 0;
        const isActiveGroup = item.MENU_ID === activeGroup;

        return (
          <Box key={item.MENU_ID} mb={2}>
            <Box
              onClick={() => hasChildren && handleGroupClick(item.MENU_ID)}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={3}
              cursor={hasChildren ? "pointer" : "default"}
              borderRadius="lg"
              transition="all 0.2s"
              _hover={{
                bg: "gray.100",
                boxShadow: "md",
              }}
              bg={
                isGroupActive(item.children || []) ? "gray.50" : "transparent"
              }
              boxShadow={isGroupActive(item.children || []) ? "sm" : "none"}
              mt={2}
            >
              <HStack spacing={3} overflow="hidden">
                {IconComponent && (
                  <Icon
                    as={IconComponent}
                    boxSize={5}
                    color={
                      "secondary.500"
                    }
                  />
                )}

                <Box maxW={{ base: "full", md: "180px" }}>
                  <Text
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    fontWeight={
                      isGroupActive(item.children || []) ? "semibold" : "normal"
                    }
                    fontSize="sm"
                    color={
                      isGroupActive(item.children || [])
                        ? "secondary.500"
                        : "black.500"
                    }
                    transition="color 0.2s"
                  >
                    {t(item.MENU_DESCRIPTION)}
                  </Text>
                </Box>
              </HStack>

              {hasChildren && (
                <MotionBox
                  animate={{ rotate: isActiveGroup ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon
                    as={isRTL ? MdNavigateBefore : MdNavigateNext}
                    boxSize={4}
                    color={
                      isGroupActive(item.children || [])
                        ? "secondary.500"
                        : "gray.500"
                    }
                  />
                </MotionBox>
              )}
            </Box>

            {/* Submenu */}
            {hasChildren && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isActiveGroup ? "auto" : 0,
                  opacity: isActiveGroup ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                  overflow: "hidden",
                  [isRTL ? "paddingRight" : "paddingLeft"]: "40px",
                }}
                className="collapsible-group"
              >
                {item.children?.map((subItem: MenuItem) => (
                  <NavItem key={subItem.MENU_ID} item={subItem} withoutIcons />
                ))}
              </motion.div>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default SidebarContent;
