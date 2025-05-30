import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastState {
    isOpen: boolean;
    title: string;
    message: string;
    type: ToastType;
}

const initialState: ToastState = {
    isOpen: false,
    title: '',
    message: '',
    type: 'success',
};

interface ShowToastPayload {
    title?: string;
    message: string;
    type?: ToastType;
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<ShowToastPayload>) => {
            const { title = '', message, type = 'info' } = action.payload;
            state.isOpen = true;
            state.title = title;
            state.message = message;
            state.type = type;
        },

        closeToast: (state) => {
            state.isOpen = false;
            state.title = '';
            state.message = '';
            state.type = 'info';
        },
    },
});

export const { showToast, closeToast } = toastSlice.actions;

export default toastSlice.reducer;
