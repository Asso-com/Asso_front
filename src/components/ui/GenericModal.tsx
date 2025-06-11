import { type ReactNode } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

interface GenericModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
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
    | "full"
  closeOnOverlayClick?: boolean
  bgColor?: string
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlayClick = false,
  bgColor = "white",
}) => {
  const { t } = useTranslation()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      closeOnOverlayClick={closeOnOverlayClick}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={bgColor}>
        {title && (
          <>
            <ModalHeader p={2}>
              <Text fontSize="16px">{t(title)}</Text>
            </ModalHeader>
            <ModalCloseButton size="sm" />
          </>
        )}
        <ModalBody p={4}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default GenericModal
