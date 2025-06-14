import axios from 'axios';

function handleAxiosError(error: unknown): never {
    if (axios.isAxiosError(error)) {
        const { response, request, message } = error;
        if (response) {
            const { status, data: responseData } = response;
            if (status === 400) {
                if (responseData.errors && typeof responseData.errors === 'object') {
                    const errorMessages = Object.values(responseData.errors).join(', ');
                    throw new Error(errorMessages);
                } else if (responseData.message) {
                    throw new Error(responseData.message);
                } else {
                    throw new Error('Validation failed');
                }
            }
            else if (status === 404) {
                throw new Error(responseData.message || 'Resource not found');
            }
            else if (status === 409) {
                throw new Error(responseData.message || 'Conflict detected');
            }
            else {
                throw new Error(responseData.message || `Unexpected error occurred`);
            }
        }
        else if (request) {
            throw new Error('No response received from server. Please check your network connection.');
        }
        else {
            throw new Error(`Request setup error: ${message}`);
        }
    } else {
        throw new Error('An unknown error occurred');
    }
}

export default handleAxiosError