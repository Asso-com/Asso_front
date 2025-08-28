import Swal from 'sweetalert2';
import i18next from 'i18next';

const t = i18next.t.bind(i18next);

type AlertOptions = {
    title?: string;
    text: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    icon?: 'warning' | 'error' | 'success' | 'info' | 'question';
    showCancelButton?: boolean;
    allowOutsideClick?: boolean;
    allowEscapeKey?: boolean;
};

export const confirmAlert = async (options: AlertOptions): Promise<boolean> => {
    const result = await Swal.fire({
        title: options.title ? t(options.title) : t('Are you sure?'),
        text: options.text,
        icon: options.icon || 'warning',
        showCancelButton: options.showCancelButton !== false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: options.confirmButtonText ? t(options.confirmButtonText) : t('Yes, proceed'),
        cancelButtonText: options.cancelButtonText ? t(options.cancelButtonText) : t('Cancel'),
        reverseButtons: true,
        focusCancel: true,
        allowOutsideClick: options.allowOutsideClick ?? false,
        allowEscapeKey: options.allowEscapeKey ?? true,
    });

    return result.isConfirmed;
};

const showAlert = (
    icon: 'success' | 'error' | 'info',
    message: string,
    title: string
) => {
    Swal.fire({
        title,
        text: message,
        icon,
        confirmButtonText: t('OK'),
        ...(icon === 'success' && {
            timer: 2000,
            timerProgressBar: true,
        }),
    });
};

export const showSuccessAlert = (
    message: string,
    title = t('alert.successTitle', 'Success!')
) => {
    showAlert('success', message, title);
};

export const showErrorAlert = (
    message: string,
    title = t('Error!')
) => {
    showAlert('error', message, title);
};

export const showInfoAlert = (
    message: string,
    title = t('Information')
) => {
    showAlert('info', message, title);
};