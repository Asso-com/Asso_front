import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  IconButton,
  Text,
  Flex,
  DrawerFooter,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useDirection } from "@hooks/useDirection";

interface RightSidebarProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "md" | "sm" | "lg" | "xl" | "xs" | "full";
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  isOpen,
  title = "Sidebar",
  onClose,
  children,
  footer,
  size = "md",
}) => {
  const { t } = useTranslation();

  const { direction } = useDirection();

  return (
    <Drawer
      closeOnOverlayClick={false}
      isOpen={isOpen}
      placement={direction === "rtl" ? "left" : "right"}
      onClose={onClose}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          borderBottomWidth="1px"
          height="50px"
          px={4}
          bg="secondary.500"
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            height="100%"
          >
            <Text fontSize="sm" color="white" noOfLines={1}>
              {t(title)}
            </Text>
            <IconButton
              aria-label="Close sidebar"
              icon={<CloseIcon color="white" />}
              onClick={onClose}
              variant="none"
              size="sm"
            />
          </Flex>
        </DrawerHeader>

        <DrawerBody
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box flex="1" py={2}>
            {children}
          </Box>
        </DrawerBody>

        {footer && (
          <DrawerFooter>
            <Flex position="relative" justifyContent="center" width="100%">
              {footer}
            </Flex>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default RightSidebar;
