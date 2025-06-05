import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import MenuContent from "./MenuContent";
import { useDirection } from "@hooks/useDirection";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { direction } = useDirection();

  if (isMobile) {
    return (
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={direction === "rtl" ? "right" : "left"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Flex direction="column" h="100%">
            <DrawerCloseButton
              position="absolute"
              top="1rem"
              zIndex="2"
              {...(direction === "rtl" ? { left: "1rem" } : { right: "1rem" })}
            />
            <Box mt={12} overflowY="auto">
              <MenuContent />
            </Box>
          </Flex>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop view: Fixed sidebar
  return (
    <Box
      as="nav"
      id="sidebar_menus"
      h="100%"
      w={isOpen ? "260px" : "0px"}
      overflowY="auto"
      overflowX="hidden"
      transition="width 0.3s ease"
      boxShadow="lg"
      borderRadius="sm"
      bg="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      zIndex="1"
    >
      <MenuContent />
    </Box>
  );
}

export default Sidebar;
