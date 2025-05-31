import React from "react";
import {
  Box,
  Image,
  Flex,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaAlignLeft } from "react-icons/fa";

import appLogo from "../../../assets/logo/startnow.jpg";

import UserDropDown from "./UserDropDown";
import DropDownLanguage from "./DropDownLanguage";
import AssociationList from "./AssociationList";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

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
        <Flex align="center" gap={2} px={4}>
          <Box width={{ base: "auto", md: "240px" }}>
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
          <AssociationList/>
        </Flex>

        <Flex gap={2} alignItems="center">
          <Box display={{ base: "none", md: "block" }}>
            <DropDownLanguage />
          </Box>
          <UserDropDown />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
