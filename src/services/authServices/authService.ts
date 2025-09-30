import api from "../baseService";
import { AuthResponse, LoginData } from "types/auth";


export const authenticateUser = async (
  loginData: LoginData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/TokenAuth/Authenticate",
    loginData
  );
  localStorage.setItem('accessToken', response.data.result.accessToken);
  localStorage.setItem('userId', response.data.result.userId);
  return response.data;
};