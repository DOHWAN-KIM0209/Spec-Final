import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from '@/components/@common/Toast/Toast';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) return;

    axios.post(`${import.meta.env.VITE_API_URL}/auth/kakao`, { code })
      .then(res => {
        localStorage.setItem('SPEC_ACCESS_TOKEN', res.data.token);
        Toast.success('카카오 로그인 성공!');
        navigate('/');
      })
      .catch(() => {
        Toast.error('카카오 로그인 실패');
        navigate('/login');
      });
  }, []);

  return <div className="text-center mt-20 text-xl">카카오 로그인 중입니다...</div>;
};

export default KakaoCallback;
