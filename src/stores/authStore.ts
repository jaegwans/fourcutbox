import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createJSONStorage, persist} from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isLoggedIn: false,
      login: async () => {
        set({isLoggedIn: true});
      },
      logout: async () => {
        set({isLoggedIn: false});
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
