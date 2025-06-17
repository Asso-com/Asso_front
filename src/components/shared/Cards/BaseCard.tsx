import React from "react";
import {
  Card,
  CardBody,
  VStack,
  Heading,
  Flex,
  Badge,
  Icon,
  useColorModeValue,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { confirmAlert } from "@components/shared/confirmAlert";

// Inline type definitions
interface BaseItem {
  id: number;
  name: string;
  code?: string;
}

interface DeleteConfig {
  onDelete?: (itemId: number, levelId?: number) => Promise<void> | void;
  deleteTitle?: string;
  deleteMessage?: (itemName: string) => string;
  confirmText?: string;
  cancelText?: string;
  isDeleting?: boolean;
  canDelete?: boolean;
}

interface CardConfig {
  color?: string;
  showCode?: boolean;
  onClick?: (item: BaseItem) => void;
  customBadge?: React.ReactNode;
  customActions?: React.ReactNode;
}

interface BaseCardProps {
  item: BaseItem;
  deleteConfig?: DeleteConfig;
  cardConfig?: CardConfig;
  children?: React.ReactNode;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  item,
  deleteConfig,
  cardConfig = {},
  children,
}) => {
  const {
    color = "blue",
    showCode = true,
    onClick,
    customBadge,
    customActions,
  } = cardConfig;

  const {
    onDelete,
    deleteTitle = "Delete item",
    deleteMessage = (name: string) => `Are you sure you want to delete "${name}"?`,
    confirmText = "Yes, delete",
    cancelText = "Cancel",
    isDeleting = false,
    canDelete = true,
  } = deleteConfig || {};

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const shadowColor = useColorModeValue("gray.200", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleDelete = async () => {
    if (!onDelete || !canDelete) return;

    const confirmed = await confirmAlert({
      title: deleteTitle,
      text: deleteMessage(item.name),
      icon: "warning",
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    });

    if (!confirmed) return;
    await onDelete(item.id);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-action-button]")) {
      e.stopPropagation();
      return;
    }
    onClick?.(item);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDelete();
  };

  return (
    <Card
      bg={cardBg}
      borderRadius="xl"
      overflow="hidden"
      position="relative"
      border="1px solid"
      borderColor={borderColor}
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor={onClick ? "pointer" : "default"}
      onClick={onClick ? handleCardClick : undefined}
      opacity={isDeleting ? 0.7 : 1}
      pointerEvents={isDeleting ? "none" : "auto"}
      _hover={
        onClick && !isDeleting
          ? {
              transform: "translateY(-8px) scale(1.02)",
              boxShadow: `0 25px 50px -12px ${shadowColor}, 0 0 0 1px ${color}40`,
            }
          : {}
      }
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        bgGradient: `linear(to-r, ${color}.400, ${color}.600)`,
      }}
    >
      <CardBody p={4}>
        <VStack align="stretch" spacing={3}>
          <Flex justify="space-between" align="start">
            <VStack align="start" spacing={1} flex={1}>
              <Heading
                size="xs"
                noOfLines={2}
                color={textColor}
                fontWeight="semibold"
                lineHeight={1.3}
              >
                {item.name}
              </Heading>
              {showCode && item.code && (
                <>
                  {customBadge || (
                    <Badge
                      colorScheme={(color ?? "blue").replace(".", "")}
                      variant="subtle"
                      borderRadius="full"
                      px={2}
                      py={0.5}
                      fontSize="2xs"
                      fontWeight="medium"
                    >
                      {item.code}
                    </Badge>
                  )}
                </>
              )}
            </VStack>

            <Flex direction="column" align="center" gap={1}>
              {customActions}
              {onDelete && (
                <Box
                  data-action-button
                  title={canDelete ? deleteTitle : "Cannot delete"}
                  onClick={handleDeleteClick}
                  cursor={isDeleting || !canDelete ? "not-allowed" : "pointer"}
                  p={1.5}
                  borderRadius="md"
                  opacity={canDelete ? 1 : 0.5}
                  _hover={
                    isDeleting || !canDelete
                      ? {}
                      : {
                          transform: "scale(1.05)",
                          bg: "red.50",
                          _dark: { bg: "red.900" },
                        }
                  }
                  transition="all 0.2s"
                >
                  {isDeleting ? (
                    <Spinner size="xs" color="red.500" />
                  ) : (
                    <Icon as={MdDelete} boxSize={4} color="red.500" />
                  )}
                </Box>
              )}
            </Flex>
          </Flex>
          {children}
        </VStack>
      </CardBody>
    </Card>
  );
};

// Export types for use in other components
export type { BaseItem, DeleteConfig, CardConfig };