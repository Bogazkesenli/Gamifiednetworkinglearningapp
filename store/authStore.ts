import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export interface UserAccount {
  name: string;
  email: string;
  passwordHash: string;
}

interface AuthState {
  accounts: Record<string, UserAccount>; // email as key
}

interface AuthActions {
  register: (name: string, email: string, passwordPlain: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, passwordPlain: string) => Promise<{ success: boolean; user?: { name: string; email: string }; error?: string }>;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      accounts: {},

      register: async (name, email, passwordPlain) => {
        const { accounts } = get();
        const normalizedEmail = email.trim().toLowerCase();

        if (accounts[normalizedEmail]) {
          return { success: false, error: "An account with this email already exists." };
        }

        if (passwordPlain.length < 6) {
          return { success: false, error: "Password must be at least 6 characters long." };
        }

        try {
          const saltedPassword = `${normalizedEmail}:${passwordPlain}`;
          const finalPasswordHash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            saltedPassword
          );

          set((state) => ({
            accounts: {
              ...state.accounts,
              [normalizedEmail]: { name, email: normalizedEmail, passwordHash: finalPasswordHash }
            }
          }));

          return { success: true };
        } catch (error) {
          return { success: false, error: "Güvenlik modülü yüklenemedi. Lütfen tekrar deneyin." };
        }
      },

      login: async (email, passwordPlain) => {
        const { accounts } = get();
        const normalizedEmail = email.trim().toLowerCase();
        const account = accounts[normalizedEmail];

        if (!account) {
          return { success: false, error: "Invalid email or password." };
        }

        try {
          const saltedPassword = `${normalizedEmail}:${passwordPlain}`;
          const finalPasswordHash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            saltedPassword
          );

          if (account.passwordHash !== finalPasswordHash) {
            return { success: false, error: "Incorrect password." };
          }
          return { success: true, user: { name: account.name, email: account.email } };
        } catch (error) {
          return { success: false, error: "Güvenlik modülü yüklenemedi. Lütfen tekrar deneyin." };
        }
      }
    }),
    {
      name: 'netpath-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
