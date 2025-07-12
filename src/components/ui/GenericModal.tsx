import { type ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  type ModalContentProps,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";
  closeOnOverlayClick?: boolean;
  bgColor?: string;
  modalContentProps?: ModalContentProps; 
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlayClick = false,
  bgColor = "white",
  modalContentProps = {},
}) => {
  const { t } = useTranslation();

  const customWidthSet = !!modalContentProps?.width || !!modalContentProps?.w || !!modalContentProps?.maxW;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={customWidthSet ? undefined : size} 
      closeOnOverlayClick={closeOnOverlayClick}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        bgColor={bgColor}
        mx={[2, 0]}
        {...modalContentProps} 
      >
        {title && (
          <>
            <ModalHeader p={2}>
              <Text fontSize="16px">{t(title)}</Text>
            </ModalHeader>
            <ModalCloseButton size="sm" />
          </>
        )}
        <ModalBody p={[2, 4]}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GenericModal;
