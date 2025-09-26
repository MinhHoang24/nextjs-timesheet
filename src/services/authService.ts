// services/authService.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-api-timesheet.nccsoft.vn/api/TokenAuth/Authenticate',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface LoginData {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
}

export const authenticateUser = async (loginData: LoginData) => {
    try {
        const response = await api.post('', loginData);

        if (response.status === 200) {
            console.log('Response data:', response.data);
        }
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    };
}