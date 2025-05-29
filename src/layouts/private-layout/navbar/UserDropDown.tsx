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

const UserDropDown = () => {
  const name: string = "Mohamed Ali";
  const email: string = "dalihelal@gmail.com";

  const { t } = useTranslation();

  return (
    <Menu>
      <MenuButton>
        <Avatar
          size="sm"
          name={name}
          bg="primary.500"
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
            <Avatar name={name} size="md" bg="primary.500" />
            <Box>
              <Text fontWeight="bold" color="gray.700">
                {name}
              </Text>
              <Text fontSize="sm" color="gray.700">
                {email}
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box p={2}>
          <MenuItem icon={<FiUser size={20} />} py={3} borderRadius="md">
            {t("Profile")}
          </MenuItem>
          <Divider my={1} />
          <MenuItem
            icon={<FiLogOut size={20} />}
            color="red.500"
            py={3}
            borderRadius="md"
          >
            {t("Logout")}
          </MenuItem>
        </Box>
      </MenuList>
    </Menu>
  );
};

export default UserDropDown;
