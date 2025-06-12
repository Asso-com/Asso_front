import React from 'react';
import type { Subject } from '../../types/subject.types';
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
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import useDeleteSubjectLevel from '../../hooks/useDeleteSubjectLevel';

export const SubjectCard: React.FC<{ 
  subject: Subject; 
  color: string;
  SubjectLevelId: number; 
}> = ({ subject, color, SubjectLevelId }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const shadowColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { mutate: deleteSubject, isPending } = useDeleteSubjectLevel();

  const handleDelete = () => {
    deleteSubject(SubjectLevelId);
    onClose();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-delete-button]')) {
      e.stopPropagation();
      return;
    }
    console.log('Card clicked:', subject.name);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onOpen();
  };

  return (
    <>
      <Card
        bg={cardBg}
        borderRadius="xl"
        overflow="hidden"
        position="relative"
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        cursor="pointer"
        onClick={handleCardClick}
        _hover={{
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: `0 25px 50px -12px ${shadowColor}, 0 0 0 1px ${color}40`,
        }}
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          bgGradient: `linear(to-r, ${color}.400, ${color}.600)`,
        }}
      >
        <CardBody p={6}>
          <VStack align="stretch" spacing={4}>
            <Flex justify="space-between" align="start">
              <VStack align="start" spacing={2} flex={1}>
                <Heading 
                  size="sm" 
                  noOfLines={2}
                  color={textColor}
                  fontWeight="bold"
                  lineHeight={1.3}
                >
                  {subject.name}
                </Heading>
                {subject.code && (
                  <Badge 
                    colorScheme={(color ?? 'blue').replace('.', '')}
                    variant="subtle"
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="medium"
                  >
                    {subject.code}
                  </Badge>
                )}
              </VStack>

              <Flex direction="column" align="center" gap={2}>
                <Box
                  data-delete-button 
                  title="Supprimer la matière"
                  onClick={handleDeleteClick}
                  cursor="pointer"
                  p={2}
                  borderRadius="md"
                  _hover={{ 
                    transform: 'scale(1.1)',
                    bg: 'red.50',
                    _dark: { bg: 'red.900' }
                  }}
                  transition="all 0.2s"
                >
                  <Icon as={MdDelete} boxSize={5} color="red.500" />
                </Box>
              </Flex>
            </Flex>
          </VStack>
        </CardBody>
      </Card>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Supprimer la matière
            </AlertDialogHeader>

            <AlertDialogBody>
              Êtes-vous sûr de vouloir supprimer la matière « {subject.name} » du niveau ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Annuler
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3} isLoading={isPending}>
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default SubjectCard;