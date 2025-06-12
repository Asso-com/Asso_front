import React, { useState, useRef } from 'react';

import type { ICellRendererParams } from '@ag-grid-community/core';


import { 
  Flex, 
  IconButton, 
  useDisclosure, 
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import type { RootState } from '@store/index';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import CoefficientSidebar from '../sidebar/CoefficientSidebar';
import CoefficientServiceApi from '../../services/CoefficientServiceApi';
import type { CoefficientType } from '../../types';

const ColumnAction = (params: ICellRendererParams) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();
  const associationId = useSelector((state: RootState) => state.authSlice.associationId);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const rowData = params.data as CoefficientType;


  const { mutate: deleteCoefficient, isPending } = useMutation({
    mutationFn: () => CoefficientServiceApi.delete(rowData.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coefficients', associationId] });
      toast({
        title: t('Deleted'),
        description: t('Coefficient settings deleted successfully'),
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: t('Error'),
        description: error.message || t('Failed to delete coefficient settings'),
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleDelete = () => {
    onOpen();
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  return (
    <>
      <Flex gap={2}>
        <IconButton
          aria-label="Edit"
          icon={<FaEdit />}
          size="sm"
          colorScheme="blue"
          onClick={handleEdit}
        />
        <IconButton
          aria-label="Delete"
          icon={<FaTrashAlt />}
          size="sm"
          colorScheme="red"
          onClick={handleDelete}
        />
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t('Delete Coefficient')}
            </AlertDialogHeader>

            <AlertDialogBody>
              {t('Are you sure you want to delete this coefficient setting?')}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} disabled={isPending}>
                {t('Cancel')}
              </Button>
              <Button 
                colorScheme="red" 
                onClick={() => deleteCoefficient()} 
                ml={3}
                isLoading={isPending}
              >
                {t('Delete')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <CoefficientSidebar
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={rowData}
      />
    </>
  );
};

export default ColumnAction;