import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Text, HStack, Icon } from "@chakra-ui/react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { motion } from "framer-motion";
import GetIconComponent from "./getIconComponent";
import NavItem from "./NavItem";
import "./menus_styles.css";

import type { MenuItem } from "../../../types/menuItem";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { useDirection } from "@hooks/useDirection";

const MotionBox = motion(Box);

const SidebarContent: React.FC = () => {
  const navigate = useNavigate();
  const menuItems = useSelector(
    (state: RootState) => state.menuSlice.menuDataFilter
  );
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const location = useLocation();

  const { isRTL } = useDirection();

  const t = (text: string) => text;

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.children && isGroupActive(item.children)) {
        setActiveGroup(item.menu_id);
      }
    });
  }, [location.pathname]);

  const handleGroupClick = (groupId: number) => {
    setActiveGroup(activeGroup === groupId ? null : groupId);
  };

  const isGroupActive = (children: MenuItem[]) => {
    return children.some((child) => location.pathname === child.navLink);
  };

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  return (
    <Box p={2}>
      {menuItems.map((item, index) => {
        const IconComponent = GetIconComponent(item.icon);
        const hasChildren = item.children && item.children.length > 0;
        const isActiveGroup = item.menu_id === activeGroup;

        return (
          <Box key={index} mb={2}>
            <Box
              //onClick={() => hasChildren && handleGroupClick(item.menu_id)}
              onClick={() => {
                if (hasChildren) {
                  handleGroupClick(item.menu_id);
                } else {
                  handleNavigate(item.navLink);
                }
              }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={3}
              cursor={"pointer"}
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
                    color={"secondary.500"}
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
                    {t(item.menu_description)}
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
                {item.children?.map((subItem: MenuItem, index) => (
                  <NavItem key={index} item={subItem} withoutIcons />
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
