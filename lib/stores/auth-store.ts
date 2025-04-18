import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserRole } from '../types';
import Cookies from 'js-cookie';

interface AuthState {
  role: UserRole | undefined;
  setRole: (role: UserRole | undefined) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      role: undefined,
      setRole: (role) => set({ role }),
      logout: () => {
        Cookies.remove('auth');
        set({ role: undefined });
        set({ isLoggedIn: false });
        window.location.href = '/';
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
