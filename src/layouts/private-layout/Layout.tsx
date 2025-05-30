import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import React, { useState, type ReactNode } from "react";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./menus";
import Module from "./modules";

type LayoutProps = {
  children?: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Flex height="100vh" direction="column" bg="#F6F6F6">
      <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <Flex direction="row" height="100%" flex="1" overflow="hidden">
        <Module />
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

        <Box
          flex={1}
          ml={isSidebarOpen && !isMobile ? "5px" : "0px"}
          transition="margin-left 0.3s ease"
          height="100%"
          overflowY="auto"
          p={2}
          borderRadius={"md"}

          //bg="linear-gradient(325deg, rgba(12, 56, 107, 0) 1%, rgba(12, 56, 107, 0.06) 100%)"
        >
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
