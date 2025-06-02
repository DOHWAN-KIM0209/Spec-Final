// src/apis/auth/login.ts
import { axiosCommonInstance } from '@/apis/axiosInstance';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
    profileUrl: string;
  };
}

export const login = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosCommonInstance.post('/auth/login', {
    email,
    password,
  });

  return response.data;
};
