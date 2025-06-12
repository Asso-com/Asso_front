import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showToast } from '@store/toastSlice';
import { useDispatch } from 'react-redux';
import StaffServiceApi from '../services/StaffServiceApi';

// interface StaffFormData {
//     firstName: string;
//     lastName: string;
//     email?: string;
//     mobileNumber?: string;
//     address: string;
//     city: string;
//     zipCode?: string;
//     state?: string;
//     comment?: string;
//     basicSalary: number;
//     jobCategory: string;
//     isActive: boolean;
// }

const useCreateStaff = (associationId: number) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: (formData: any) => StaffServiceApi.create(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['staff', associationId],
            });
            dispatch(showToast({
                title: 'Succès',
                message: 'Le membre a été ajouté avec succès',
                type: 'success'
            }));
        },
        onError: (error: Error) => {
            dispatch(showToast({
                title: 'Erreur',
                message: error.message || "Échec de l'ajout du membre",
                type: 'error'
            }));
        }
    });
};

export default useCreateStaff;