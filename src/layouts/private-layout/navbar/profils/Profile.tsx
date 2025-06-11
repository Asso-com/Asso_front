import { FaBuilding } from "react-icons/fa";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Text,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import UserProfile from "./UserProfile";
import AssociationProfile from "./AssociationProfile";

const Profile: React.FC = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Flex
      direction="column"
      bg={bgColor}
      borderRadius="lg"
      overflow="hidden"
      height="80vh"
    >
      <Tabs
        variant="soft-rounded"
        colorScheme="purple"
        display="flex"
        flexDirection="column"
        style={{ width: "100%", height: "100%" }}
      >
        <TabList
          bg={inputBg}
          p={1}
          borderRadius="lg"
          mb={4}
          display={"flex"}
          alignItems={"center"}
          gap={1}
        >
          <Tab flex={1} _selected={{ bg: "white", shadow: "sm" }}>
            <HStack spacing={2}>
              <FiUser size={16} />
              <Text fontSize="sm" fontWeight="medium">
                Personal
              </Text>
            </HStack>
          </Tab>
          <Tab flex={1} _selected={{ bg: "white", shadow: "sm" }}>
            <HStack spacing={2}>
              <FaBuilding size={16} />
              <Text fontSize="sm" fontWeight="medium">
                Organization
              </Text>
            </HStack>
          </Tab>
        </TabList>

        <TabPanels flex={1} bg="white" overflow="scroll" height={"100%"} p={0}>
          <TabPanel height="100%" width="100%" p={0}>
            <UserProfile />
          </TabPanel>
          <TabPanel height="100%" width="100%" p={0}>
            <AssociationProfile />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Profile;
