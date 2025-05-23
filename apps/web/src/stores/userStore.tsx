import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUserState {
  isLogin: boolean;
  name: string;
  profileUrl: string;
  email: string;
  login: (name: string, profileUrl: string, email: string) => void;
  logout: () => void;
  updateProfile: (profileUrl: string) => void;
}

const userStore = create(
  persist<IUserState>(
    set => ({
      isLogin: false,
      name: '',
      profileUrl: '',
      email: '',
      login: (name, profileUrl, email) => set({ isLogin: true, name: name, profileUrl: profileUrl, email: email }),
      logout: () => {
        set({ isLogin: false, name: '', profileUrl: '', email: '' });
        localStorage.setItem('SPEC_ACCESS_TOKEN', '');
      },
      updateProfile: profileUrl => set({ profileUrl: profileUrl }),
    }),
    {
      name: 'SPEC_USER_STORE',
    },
  ),
);

export default userStore;
