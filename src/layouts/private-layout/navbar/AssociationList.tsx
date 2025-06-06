import React from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  useColorModeValue,
  Divider,
  Skeleton,
} from "@chakra-ui/react";
import { FaCheck, FaUsers, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setAssociationId } from "@store/authSlice";
import useFetchAssociations from "@features/Partner/list-partner/hooks/useFetchAssociations";
import type { RootState } from "@store/index";
import type { Association } from "@features/Partner/list-partner/types/AssociationType";


const AssociationList: React.FC = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const associationId = useSelector(
    (state: RootState) => state.authSlice.associationId
  );
  const { data: associations = [], isLoading } = useFetchAssociations();

  // Find the currently selected association from the list
  const selectedAssociation = associations.find(
    (a: Association) => a.id === associationId
  );

  // Colors based on color mode
  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const activeBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Dispatch the selected association id to Redux
  const handleSelect = (association: Association) => {
    dispatch(setAssociationId(association.id));
  };

  return (
    <Box position="relative">
      {isLoading ? (
        <Skeleton height="48px" width="280px" borderRadius="md" />
      ) : (
        <Menu autoSelect={false} closeOnSelect={true}>
          {({ isOpen }) => (
            <>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <MenuButton
                  as={Flex}
                  align="center"
                  px={3}
                  py={2}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={isOpen ? "blue.400" : borderColor}
                  bg={bgColor}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ borderColor: "blue.300" }}
                  minW="280px"
                >
                  <Flex align="center" w="100%">
                    <Avatar
                      size="sm"
                      icon={<Icon as={FaUsers} />}
                      bg="secondary.500"
                      color="white"
                      mr={3}
                    />
                    <Box textAlign="left" flex="1" overflow="hidden">
                      <Text fontSize="sm" fontWeight="medium" isTruncated>
                        {selectedAssociation?.name || t("Select association")}
                      </Text>
                      <Text fontSize="xs" color="gray.500" isTruncated>
                        {selectedAssociation?.associationIdentifier}
                      </Text>
                    </Box>
                    <Icon
                      as={FaChevronDown}
                      ml={2}
                      transition="transform 0.2s"
                      transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                    />
                  </Flex>
                </MenuButton>
              </motion.div>

              <MenuList
                zIndex="dropdown"
                py={2}
                borderColor={borderColor}
                boxShadow="md"
                minW="280px"
              >
                <Text
                  px={3}
                  pb={2}
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.500"
                  textAlign="center"
                >
                  {t("Available Associations")}
                </Text>
                <Divider mb={1} />
                {associations.map((association: Association) => (
                  <MenuItem
                    key={association.id}
                    onClick={() => handleSelect(association)}
                    py={2}
                    px={3}
                    bg={
                      selectedAssociation?.id === association.id
                        ? "blue.50"
                        : "transparent"
                    }
                    _hover={{ bg: hoverBg }}
                    _active={{ bg: activeBg }}
                    _focus={{ bg: hoverBg }}
                  >
                    <Flex align="center" w="100%">
                      <Avatar
                        size="sm"
                        icon={<Icon as={FaUsers} />}
                        bg={association.isPartner ? "teal.500" : "gray.400"}
                        color="white"
                        mr={3}
                      />
                      <Box flex="1">
                        <Text
                          fontWeight={
                            selectedAssociation?.id === association.id
                              ? "bold"
                              : "normal"
                          }
                        >
                          {association.name}
                        </Text>
                        <Text fontSize="xs" color="gray.500" isTruncated>
                          {association.associationIdentifier}
                        </Text>
                      </Box>
                      {selectedAssociation?.id === association.id && (
                        <Icon as={FaCheck} color="blue.500" boxSize={4} />
                      )}
                    </Flex>
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      )}
    </Box>
  );
};

export default AssociationList;
