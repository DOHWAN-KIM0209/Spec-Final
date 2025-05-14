import { axiosCommonInstance } from '@/apis/axiosInstance';
import {
  IGetEmailDuplicateRes,
  IPostEmailCertificationRes,
  IPostEmailVerifyReq,
  IPostEmailVerifyRes,
  IPostJoinReq,
  IPostJoinRes,
  IPostLoginReq,
  IPostLoginRes,
} from '@/types/auth';
import { APIResponse } from '@/types/model';

export const getIsEmailDuplicate = async (email: string): Promise<APIResponse<IGetEmailDuplicateRes>> => {
  const res = await axiosCommonInstance.get(`/api/email?email=${email}`);
  return res.data;
};

export const postEmailCertification = async (email: string): Promise<APIResponse<IPostEmailCertificationRes>> => {
  const res = await axiosCommonInstance.post('/api/email', {
    email: email,
  });
  return res.data;
};

export const postVerifyEmail = async ({
  email,
  authorizationCode,
}: IPostEmailVerifyReq): Promise<APIResponse<IPostEmailVerifyRes>> => {
  const res = await axiosCommonInstance.post('/api/email/verify', {
    email: email,
    authorizationCode: authorizationCode,
  });
  return res.data;
};

export const postSignup = async ({ email, password, name }: IPostJoinReq): Promise<APIResponse<IPostJoinRes>> => {
  const res = await axiosCommonInstance.post('/api/auth/join', {
    email: email,
    password: password,
    name: name,
  });
  return res.data;
};

export const postLogin = async ({ email, password }: IPostLoginReq): Promise<APIResponse<IPostLoginRes>> => {
  const res = await axiosCommonInstance.post('/api/auth/login', {
    email,
    password,
  });

  // ✅ 백엔드에서 응답 body에 token이 있음
  if (res.status === 200 && res.data.token) {
    localStorage.setItem('SPEC_ACCESS_TOKEN', res.data.token); // ✅ 여기에 저장
  }

  return res.data;
};
