import computer from '@/assets/images/computer.png';
import logoWhite from '@/assets/images/logo_white.png';
import LoginForm from '@/components/login/LoginForm';
import userStore from '@/stores/userStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLogin } = userStore();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]); // isLogin 변할 때마다 체크, navigate는 안정성용

  return (
    <div className="w-screen h-screen flex overflow-y-hidden">
      <div className="w-[55%] min-w-[600px] relative animate-showLeft">
        <img
          src={computer}
          alt="computer"
          className="w-full h-screen object-cover rounded-r-3xl absolute"
        />
        <div className="w-full h-full absolute p-[50px]">
          <img
            src={logoWhite}
            alt="white logo"
            className="w-[200px] cursor-pointer"
            onClick={() => navigate('/')}
          />
          <div className="text-[100%] text-[#DADADA] pt-2 cursor-pointer">
            AI와 함께 면접 준비하고 <br />
            좋은 결과 기대해봐요!
          </div>
        </div>
      </div>
      <div className="w-[45%] min-w-[600px]">
        {/* LoginForm 안에서 로그인 API 호출과 상태 업데이트를 처리합니다 */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
