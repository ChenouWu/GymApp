import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const BASE_URL = 'https://gym-socialapp.onrender.com/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      await AsyncStorage.setItem('token', data.token);

      set({ user: data.user, token: data.token, isLoading: false });
      return { success: true };
    } catch (error) {
      console.error('Error registering:', error);
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
      set({ token, user });
    } catch (error) {
      console.error('Error checking auth:', error);
    }
  },

  LogIn: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      await AsyncStorage.setItem('token', data.token);

      set({ user: data.user, token: data.token, isLoading: false });
      return { success: true };
    } catch (error) {
      console.error('🚨 Error logging in:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  LogOut: async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      set({ user: null, token: null });

      router.replace('/(auth)/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },

  getMyexercises: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.warn('⚠️ Token not found in AsyncStorage');
        throw new Error('Unauthorized');
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${BASE_URL}/workout/getmy`, {
        method: 'GET',
        headers,
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data.message || 'Unauthorized');
      }

      return data;
    } catch (error) {
      console.error('❌ Network Error Details:', {
        message: error.message,
        stack: error.stack,
        error,
      });
    }
  },

  getUserProfile: async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token missing');

      const res = await fetch(`${BASE_URL}/auth/getuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch user');

      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      set({ user: data.user });
    } catch (err) {
      console.error('❌ Failed to fetch user profile:', err.message);
    }
  },
}));
