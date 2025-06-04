import React, { useRef, useState, useEffect } from "react";
import {
  Flex,
  Box,
  useColorModeValue,
  Divider,
  IconButton,
} from "@chakra-ui/react";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClipboardList,
  FaBookOpen,
  FaMoneyCheckAlt,
  FaBusAlt,
  FaBell,
  FaCogs,
  FaLaptop,
  FaComments,
  FaHandshake,
  FaThLarge,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import GenericIconButtonWithTooltip from "../../../components/shared/icons-buttons/GenericIconButtonWithTooltip";
import { useDispatch, useSelector } from "react-redux";
import { setFilterData } from "@store/menuSlice";
import type { RootState } from "@store/index";
import type { ModuleItem } from "@/types/menuItem";

const ModuleListScroller: React.FC = () => {
  const dispatch = useDispatch();

  const { modulesList: modules = [], currentModule } = useSelector(
    (state: RootState) => state.menuSlice
  );

  const handleChangeModule = (module: ModuleItem) => {
    dispatch(setFilterData(module.MODULE));
  };

  // Updated icons based on Smart School App modules
  const moduleIcons: Record<string, React.ElementType> = {
    ALL: FaThLarge,
    ENROLLMENT: FaUserGraduate,
    HUMAN_RESOURCES: FaChalkboardTeacher,
    ATTENDANCE: FaClipboardList,
    TIMETABLE: FaCalendarAlt,
    EDUCATION: FaBookOpen,
    GRADES: FaClipboardList,
    LIBRARY: FaBookOpen,
    FINANCE: FaMoneyCheckAlt,
    TRANSPORT: FaBusAlt,
    NOTIFICATIONS: FaBell,
    PARTNER: FaHandshake,
    EVENTS: FaCalendarAlt,
    ONLINE_CLASSES: FaLaptop,
    COMMUNICATION: FaComments,
    SETTINGS: FaCogs,
  };

  const getModuleIcon = (moduleName: string) => {
    return moduleIcons[moduleName] || FaThLarge;
  };

  return (
    <Flex
      height="100%"
      direction="column"
      gap={2}
      overflow="auto"
      pl={3}
      py={4}
    >
      <Flex
        direction="column"
        align="start"
        gap={2}
        overflow="hidden"
        scrollBehavior="smooth"
      >
        {modules.map((module, index) => {
          const Icon = getModuleIcon(module.MODULE);
          const isActive = module.MODULE === currentModule;

          return (
            <Box
              key={index}
              p={1}
              bg={isActive ? "white" : "secondary.500"}
              borderLeftRadius="3xl"
              position="relative"
              onClick={() => handleChangeModule(module)}
              _before={
                isActive
                  ? {
                      content: '""',
                      position: "absolute",
                      height: "50px",
                      width: "50px",
                      backgroundColor: "transparent",
                      right: "0px",
                      top: "-50px",
                      borderRadius: "48%",
                      boxShadow: "20px 20px white",
                      zIndex: "2",
                      pointerEvents: "none", // <-- prevent click interference
                    }
                  : {}
              }
              _after={
                isActive
                  ? {
                      content: '""',
                      position: "absolute",
                      height: "50px",
                      width: "50px",
                      background: "transparent",
                      right: "0px",
                      bottom: "-50px",
                      borderRadius: "48%",
                      boxShadow: "20px -20px white",
                      zIndex: "2",
                      pointerEvents: "none", // <-- prevent click interference
                    }
                  : {}
              }
            >
              <IconButton
                icon={<Icon />}
                aria-label={module.MODULE}
                variant="none"
                size="lg"
                color={isActive ? "secondary.500" : "white"}
                // borderRadius="full"
                _hover={{}}
                _active={{
                  color: isActive ? "secondary.500" : "white",
                }}
                _focus={{ boxShadow: "none" }}
              />
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ModuleListScroller;
