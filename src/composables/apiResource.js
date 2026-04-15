import useRequestsWrapper from './useRequestsWrapper.js';

const apiUrl = import.meta.env.VITE_GATEWAY_URL;

export default function apiResource() {
    const { get, post, patch, deleteRequest } = useRequestsWrapper();

    const authenticateFirebaseToken = async (data) => {
        try {
            const response = await post(`${apiUrl}/v1/api/auth`, data);
            return response;
        } catch (error) {
            console.error('Error fetching:', error);
            return null;
        }
    }

    return {
        get,
        post,
        patch,
        deleteRequest,
        authenticateFirebaseToken,
    }
}