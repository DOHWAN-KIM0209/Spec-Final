import {
  IGetEmailDuplicateRes,
  IPostEmailCertificationRes,
  IPostEmailVerifyRes,
  IPostJoinRes,
  IPostLoginRes,
} from '@/types/auth';
import { APIResponse } from '@/types/model';

export const getEmailDuplicateRes: APIResponse<IGetEmailDuplicateRes> = {
  result: 'ok',
  data: {
    available: true,
  },
};

export const postEmailCertificationRes: APIResponse<IPostEmailCertificationRes> = {
  result: 'ok',
  data: {
    result: '',
  },
};

export const postEmailVerifyRes: APIResponse<IPostEmailVerifyRes> = {
  result: 'ok',
  data: {
    verify: true,
  },
};

export const postJoinRes: APIResponse<IPostJoinRes> = {
  result: 'ok',
  data: {
    user: {
      email: 'tnghk9611@naver.com',
      profileImageName: 'image', // optional일 경우 타입 정의에도 있어야 함
      profileImageUrl: 'image',
      name: '이수화',
      resumeList: [
        {
          id: 1,
          displayName: '수화의 이력서',
          filePath: '',
          fileSize: '3000',
          status: 'fail',
        },
      ],
    },
  },
};

export const postLoginRes: APIResponse<IPostLoginRes> = {
  result: 'ok',
  data: {
    token: 'mock-token-1234', // ✅ 필수
    user: {
      email: 'tnghk9611@naver.com',
      profileImageName: 'image',
      profileImageUrl:
        'https://i.namu.wiki/i/kwzpyLbWWq104Sny-FNaj0cGadskPMEf6KHqrSD1YQ_IHDjjC61DgFftSytELDwSwtuUgQG3e0Feb4F01ZrnZHYFyt2VkesGyU207md8_nfGVAbYoZ8h1eEt-AF0NlO3PwahAYB3oanCtu_Q8tJBBw.webp',
      name: '이수화',
      resumeList: [
        {
          id: 1,
          displayName: '수화의 이력서',
          filePath: '',
          fileSize: '3000',
          status: 'fail',
        },
      ],
    },
  },
};
