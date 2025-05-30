import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import MenuContent from "./MenuContent";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return isMobile ? (
    <></>
  ) : (
    <Box
      id="sidebar_menus"
      as="nav"
      h="100%"
      w={isOpen ? "260px" : "0px"}
      overflow="scroll"
      overflowX="hidden"
      boxShadow="lg"
      borderRadius="sm"
      transition="width 0.3s ease, border-right 0.3s ease"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      zIndex="1"
      bg="white"
    >
      <MenuContent />
    </Box>
  );
}

export default Sidebar;
