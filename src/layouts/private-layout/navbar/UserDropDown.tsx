import {
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Flex,
  Divider,
} from "@chakra-ui/react";

import { FiUser, FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useAuth } from "@hooks/useAuth";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useState, useCallback } from "react";
import GenericModal from "@components/ui/GenericModal";
import Profile from "./profils/Profile";

const UserDropDown = () => {
  const { logout } = useAuth();
  const { t } = useTranslation();

  const userData = useSelector((state: RootState) => state.authSlice.userData);
  const userName: string = userData?.email?.split("@")[0] || "";
  const email: string = userData?.email || "";

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const handleToggleProfileModal = useCallback(() => {
    setProfileModalOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar
            size="sm"
            name={userName}
            bg="secondary.500"
            color="white"
            cursor="pointer"
            _hover={{ transform: "scale(1.05)" }}
            transition="all 0.2s"
          />
        </MenuButton>

        <MenuList
          p={0}
          overflow="hidden"
          minW="240px"
          border="none"
          boxShadow="xl"
        >
          <Box p={4}>
            <Flex align="center" gap={3}>
              <Avatar name={userName} size="sm" bg="secondary.500" />
              <Box>
                <Text fontWeight="bold" color="gray.700">
                  {userName}
                </Text>
                <Text fontSize="sm" color="gray.700">
                  {email}
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box p={2}>
            <MenuItem
              icon={<FiUser size={20} />}
              onClick={handleToggleProfileModal}
              py={3}
              borderRadius="md"
            >
              {t("Profile")}
            </MenuItem>
            <Divider my={1} />
            <MenuItem
              icon={<FiLogOut size={20} />}
              color="red.500"
              py={3}
              borderRadius="md"
              onClick={logout}
            >
              {t("Logout")}
            </MenuItem>
          </Box>
        </MenuList>
      </Menu>

      <GenericModal
        isOpen={isProfileModalOpen}
        onClose={handleToggleProfileModal}
        size="6xl"
        title="Profile"
      >
        <Profile />
      </GenericModal>
    </>
  );
};

export default UserDropDown;
