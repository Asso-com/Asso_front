import GetIconComponent from "./getIconComponent";
import { Box, Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";


import type { MenuItem } from "../../../types/menuItem";

interface NavItemProps {
  item: MenuItem;
  withoutIcons?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ item, withoutIcons = false }) => {
  const IconComponent = GetIconComponent(item.icon);
  const navigate = useNavigate();
  const location = useLocation();
  const isActiveNavbar = location.pathname === item.NAVLINK;
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const handleNavigate = () => {
    navigate(item.NAVLINK);
  };

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const checkTruncation = () => {
      setIsTruncated(textElement.scrollWidth > textElement.clientWidth);
    };

    checkTruncation();

    const observer = new ResizeObserver(() => {
      checkTruncation();
    });

    observer.observe(textElement);

    return () => {
      observer.disconnect();
    };
  }, [item.MENU_DESCRIPTION]);

  return (
    <Box
      as="button"
      display="flex"
      alignItems="center"
      w="full"
      textAlign="left"
      p={2}
      color={isActiveNavbar ? "#00286D" : "gray"}
      _hover={{ bg: "gray.200" }}
      borderRadius="md"
      bg="transparent"
      onClick={handleNavigate}
    >
      <Flex alignItems="center" justifyContent="space-between" gap={2} w="100%">
        {!withoutIcons && IconComponent && (
          <Icon as={IconComponent} boxSize={5} color="#00286D" />
        )}
        <Tooltip
          label={item.MENU_DESCRIPTION}
          hasArrow
          placement="right"
          isDisabled={!isTruncated}
        >
          <Text
            ref={textRef}
            fontSize="sm"
            fontWeight="sm"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            flex="1"
          >
            {item.MENU_DESCRIPTION}
          </Text>
        </Tooltip>

      </Flex>
    </Box>
  );
};

export default NavItem;
