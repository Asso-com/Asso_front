import {
  Box,
  Image,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Tooltip,
  VStack,
  DrawerHeader,
  DrawerContent,
  Drawer,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerBody,
  Text,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaAlignLeft, FaCalendarAlt } from "react-icons/fa";

import appLogo from "../../../assets/logo/startnow.jpg";

import UserDropDown from "./UserDropDown";
import DropDownLanguage from "./DropDownLanguage";
import AssociationList from "./AssociationList";
import { FiMoreVertical } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import ActivePeriod from "./ActivePeriod";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      borderBottom={`1px solid ${borderColor}`}
      bg={bgColor}
      px={4}
      py={2}
      shadow="md"
      position="sticky"
      top="0"
      zIndex="1000"
      borderRadius="md"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex align="center" gap={2}>
          <Box width={{ base: "150px", md: "240px" }}>
            <Image src={appLogo} width="80%" objectFit="cover" />
          </Box>

          <IconButton
            aria-label="Toggle Sidebar"
            icon={
              isSidebarOpen ? (
                <HamburgerIcon boxSize={5} />
              ) : (
                <FaAlignLeft size={18} />
              )
            }
            onClick={onToggleSidebar}
            variant="ghost"
          />
          <Box display={{ base: "none", md: "flex" }} gap={2}>
            <AssociationList />
            <ActivePeriod />
          </Box>
        </Flex>

        <Flex gap={2} alignItems="center">
          <Flex
            alignItems="center"
            color="gray.600"
            fontWeight="medium"
            fontSize="md"
            display={{ base: "none", md: "flex" }}
          >
            <Icon as={FaCalendarAlt} mr={1} />
            <Text>08/07/2025</Text>
          </Flex>

          <Box display={{ base: "none", md: "block" }}>
            <DropDownLanguage />
          </Box>

          <UserDropDown />
        </Flex>

        <Tooltip label="More options">
          <IconButton
            aria-label="Open mobile menu"
            icon={<FiMoreVertical size={20} />}
            onClick={onOpen}
            variant="ghost"
            display={{ base: "flex", md: "none" }}
            colorScheme="gray"
          />
        </Tooltip>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton size="lg" />
          <DrawerHeader borderBottom={`1px solid ${borderColor}`}>
            <Text fontSize={"sm"}>{t("Menu Options")}</Text>
          </DrawerHeader>
          <DrawerBody py={2}>
            <VStack spacing={6} align="stretch">
              <AssociationList />
              <ActivePeriod />
              <DropDownLanguage />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
