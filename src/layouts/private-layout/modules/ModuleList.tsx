import React from "react";
import { Flex, Box, IconButton, Tooltip } from "@chakra-ui/react";
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
import { useDispatch, useSelector } from "react-redux";
import { setFilterData } from "@store/menuSlice";
import type { RootState } from "@store/index";
import type { ModuleItem } from "@/types/menuItem";
import { useDirection } from "@hooks/useDirection";

const ModuleListScroller: React.FC = () => {
  const dispatch = useDispatch();
  const { isRTL } = useDirection();

  const { modulesList: modules = [], currentModule } = useSelector(
    (state: RootState) => state.menuSlice
  );

  const handleChangeModule = (module: ModuleItem) => {
    dispatch(setFilterData(module.MODULE));
  };

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
      py={4}
      pl={isRTL ? 0 : 3}
      pr={isRTL ? 3 : 0}
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
              p={2}
              bg={isActive ? "white" : "secondary.500"}
              borderLeftRadius={isRTL ? "none" : "full"}
              borderRightRadius={isRTL ? "full" : "none"}
              position="relative"
              onClick={() => handleChangeModule(module)}
              _before={
                isActive
                  ? {
                      content: '""',
                      position: "absolute",
                      height: "35px",
                      width: "35px",
                      backgroundColor: "transparent",
                      [isRTL ? "left" : "right"]: "0px",
                      top: "-35px",
                      borderRadius: "50%",
                      boxShadow: isRTL
                        ? "-20px 20px 0 0 white"
                        : "20px 20px 0 0 white",
                      zIndex: "2",
                      pointerEvents: "none",
                    }
                  : {}
              }
              _after={
                isActive
                  ? {
                      content: '""',
                      position: "absolute",
                      height: "35px",
                      width: "35px",
                      background: "transparent",
                      [isRTL ? "left" : "right"]: "0px",
                      bottom: "-35px",
                      borderRadius: "50%",
                      boxShadow: isRTL
                        ? "-20px -20px 0 0 white"
                        : "20px -20px 0 0 white",
                      zIndex: "2",
                      pointerEvents: "none",
                    }
                  : {}
              }
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="secondary.500"
                borderRadius="50%"
                zIndex="99999"
              >
                <Tooltip
                  label={module.MENU_DESCRIPTION}
                  placement={isRTL ? "left" : "right"}
                >
                  <IconButton
                    icon={<Icon size={18} />}
                    aria-label={module.MODULE}
                    variant="none"
                    size="md"
                    color="white"
                    _hover={{}}
                    _focus={{ boxShadow: "none" }}
                  />
                </Tooltip>
              </Box>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ModuleListScroller;
