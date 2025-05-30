import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Icon,
  Text,
  Button,
  Center,
  Fade,
  Box,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import { closeToast } from "../../store/toastSlice";
import { useTranslation } from "react-i18next";
import GenericModal from "@components/ui/GenericModal";
import type { RootState } from "@/store";

const ToastModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpen, type, title, message } = useSelector(
    (state: RootState) => state.toastSlice
  );

  const handleClose = () => {
    dispatch(closeToast());
  };

  const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  `;

  const toastStyles = {
    success: {
      bgColor: useColorModeValue("green.50", "green.900"),
      borderColor: "green.400",
      icon: <Icon as={FaCheckCircle} boxSize={12} color="green.500" animation={`${pulse} 2s infinite`} />,
    },
    error: {
      bgColor: useColorModeValue("red.50", "red.900"),
      borderColor: "red.400",
      icon: <Icon as={FaExclamationCircle} boxSize={12} color="red.500" animation={`${pulse} 2s infinite`} />,
    },
    warning: {
      bgColor: useColorModeValue("yellow.50", "yellow.900"),
      borderColor: "yellow.400",
      icon: <Icon as={FaExclamationTriangle} boxSize={12} color="yellow.500" animation={`${pulse} 2s infinite`} />,
    },
    info: {
      bgColor: useColorModeValue("blue.50", "blue.900"),
      borderColor: "blue.400",
      icon: <Icon as={FaInfoCircle} boxSize={12} color="blue.500" animation={`${pulse} 2s infinite`} />,
    },
    default: {
      bgColor: useColorModeValue("gray.50", "gray.700"),
      borderColor: "gray.400",
      icon: <Icon as={FaInfoCircle} boxSize={12} color="gray.500" />,
    },
  };

  const { bgColor, icon, borderColor } = toastStyles[type] || toastStyles.default;

  return (
    <Fade in={isOpen}>
      <GenericModal
        isOpen={isOpen}
        onClose={handleClose}
        size="md"
        bgColor={bgColor}
       // border="1px solid"
      //  borderColor={borderColor}
       // borderRadius="xl"
      //  boxShadow="xl"
      >
        <Box p={6}>
          <VStack spacing={4}>
            <Center>{icon}</Center>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="gray.800">
              {t(title) || t("Notification")}
            </Text>
            <Text fontSize="md" textAlign="center" color="gray.600">
              {t(message)}
            </Text>
            <Button
              mt={4}
              px={6}
              py={2}
              bgGradient="linear(to-r, blue.400, blue.600)"
              color="white"
              onClick={handleClose}
              _hover={{
                bgGradient: "linear(to-r, blue.500, blue.700)",
                transform: "scale(1.05)",
              }}
              transition="all 0.3s"
              borderRadius="lg"
              shadow="md"
            >
              {t("Close")}
            </Button>
          </VStack>
        </Box>
      </GenericModal>
    </Fade>
  );
};

export default ToastModal;
