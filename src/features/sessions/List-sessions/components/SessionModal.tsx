import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Button,
  Icon,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { FiInfo, FiCalendar } from "react-icons/fi";
import SessionDetails from "./SessionDetails";
import SessionScheduleDetails from "./SessionScheduleDetails";
import type { Session } from "../types/session.types";

interface UnifiedSessionModalProps {
  sessionData: Session;
}

type TabType = "details" | "schedule";

const UnifiedSessionModal: React.FC<UnifiedSessionModalProps> = ({ sessionData }) => {
  const [activeTab, setActiveTab] = useState<TabType>("details");
  
  const tabBg = useColorModeValue("gray.50", "gray.700");
  const activeTabBg = useColorModeValue("blue.900", "blue.900");
  const TabButton = ({ 
    tab, 
    label, 
    icon 
  }: { 
    tab: TabType; 
    label: string; 
    icon: any 
  }) => (
    <Button
      leftIcon={<Icon as={icon} />}
      variant={activeTab === tab ? "solid" : "ghost"}
      colorScheme={activeTab === tab ? "blue" : "gray"}
      bg={activeTab === tab ? activeTabBg : tabBg}
      onClick={() => setActiveTab(tab)}
      size="sm"
      borderRadius="md"
      _hover={{
        bg: activeTab === tab ? activeTabBg : useColorModeValue("gray.100", "gray.600"),
      }}
    >
      {label}
    </Button>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "details":
        return <SessionDetails sessionData={sessionData} />;
      case "schedule":
        return <SessionScheduleDetails sessionData={sessionData} />;
      default:
        return <SessionDetails sessionData={sessionData} />;
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      {/* Navigation Tabs */}
      <Box 
        p={2} 
        borderRadius="md" 
      >
        <HStack spacing={2} justify="flex-start">
          <TabButton 
            tab="details" 
            label="Session Details" 
            icon={FiInfo} 
          />
          <TabButton 
            tab="schedule" 
            label="Schedule" 
            icon={FiCalendar} 
          />
        </HStack>
      </Box>

      <Divider />

      {/* Content Area */}
      <Box>
        {renderContent()}
      </Box>
    </VStack>
  );
};

export default UnifiedSessionModal;