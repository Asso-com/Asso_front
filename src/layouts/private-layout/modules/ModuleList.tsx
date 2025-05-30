import React, { useRef, useState, useEffect } from "react";
import { Flex, Box, useColorModeValue, Divider } from "@chakra-ui/react";

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
import { useNavigate } from "react-router-dom";

import GenericIconButtonWithTooltip from "../../../components/shared/icons-buttons/GenericIconButtonWithTooltip";
import type { ModuleItem } from "./types/Module";
import { fakeModules } from "./data/fakeModules";

const ModuleListScroller: React.FC = () => {
  const navigate = useNavigate();
  const modules: ModuleItem[] = fakeModules;

  const [currentModule, setCurrentModule] = useState<string>("DASHBOARD");

  const handleChangeModule = (module: ModuleItem) => {
    setCurrentModule(module.MODULE);
    // Optional: navigate(`/modules/${module.MODULE.toLowerCase()}`);
  };

  // Updated icons based on Smart School App modules
  const moduleIcons: Record<string, React.ElementType> = {
    DASHBOARD: FaThLarge,
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

  const inactiveColor = useColorModeValue("gray.500", "gray.300");
  const containerRef = useRef<HTMLDivElement>(null);
  const [showVerticalButtons, setShowVerticalButtons] = useState(false);

  const scrollUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: 250,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const updateScrollButtons = () => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        setShowVerticalButtons(scrollHeight > clientHeight);
      }
    };

    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, []);

  return (
    <Flex height="100%" direction="column" gap={2} overflow="auto" p={2}>
      {showVerticalButtons && (
        <Box textAlign="center" mt={2}>
          <GenericIconButtonWithTooltip
            icon={<IoIosArrowUp />}
            label="Scroll Up"
            size="md"
            onClick={scrollUp}
          />
          <Divider my={2} />
        </Box>
      )}

      <Flex
        direction="column"
        align="start"
        gap={2}
        overflow="hidden"
        ref={containerRef}
        scrollBehavior="smooth"
      >
        {modules.map((module, index) => {
          const Icon = getModuleIcon(module.MODULE);
          const isActive = module.MODULE === currentModule;

          return (
            <Box key={index}>
              <GenericIconButtonWithTooltip
                icon={<Icon />}
                placement="top"
                ariaLabel={module.MODULE}
                label={module.MENU_DESCRIPTION}
                size="md"
                variant={isActive ? "solid" : "outline"}
                onClick={() => handleChangeModule(module)}
                bgColor={isActive ? "secondary.400" : "white"}
                color={isActive ? "white" : inactiveColor}
              />
            </Box>
          );
        })}
      </Flex>

      {showVerticalButtons && (
        <Box textAlign="center" mt={2}>
          <Divider my={2} />
          <GenericIconButtonWithTooltip
            icon={<IoIosArrowDown />}
            label="Scroll Down"
            ariaLabel="scroll_down"
            size="md"
            onClick={scrollDown}
          />
        </Box>
      )}
    </Flex>
  );
};

export default ModuleListScroller;
