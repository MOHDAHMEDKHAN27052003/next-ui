import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const message = error.response?.data?.message || error.message;

        if (
            (error.response?.status === 401 && message === 'Access token not found') &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                await apiClient.post('/auth/update-tokens');
   
                return apiClient(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;