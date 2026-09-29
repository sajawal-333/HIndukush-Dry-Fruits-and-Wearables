import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; message: string }>;
  register: (data: { name: string; email: string; phone: string; password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

// Mock user data
const MOCK_USER: User = {
  id: 'user-1',
  name: 'Ahmed Khan',
  email: 'ahmed@example.com',
  phone: '03001234567',
  createdAt: '2025-01-01T00:00:00Z',
  addresses: [
    {
      fullName: 'Ahmed Khan',
      phone: '03001234567',
      address: 'House 12, Street 5, Gulberg III',
      city: 'Lahore',
      area: 'Gulberg',
      province: 'Punjab',
    },
  ],
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async ({ email, password }) => {
        set({ isLoading: true });
        // Simulate API delay
        await new Promise((r) => setTimeout(r, 800));
        set({ isLoading: false });

        // Mock auth — any valid-looking credentials work
        if (email && password.length >= 6) {
          set({
            user: { ...MOCK_USER, email },
            isAuthenticated: true,
          });
          return { success: true, message: 'Welcome back!' };
        }
        return { success: false, message: 'Invalid email or password' };
      },

      register: async ({ name, email, phone, password }) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 1000));
        set({ isLoading: false });

        if (name && email && phone && password.length >= 6) {
          set({
            user: { ...MOCK_USER, name, email, phone },
            isAuthenticated: true,
          });
          return { success: true, message: 'Account created successfully!' };
        }
        return { success: false, message: 'Please fill all fields correctly' };
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: 'kkk-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
