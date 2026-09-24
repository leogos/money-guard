import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  registerUser,
  loginUser,
  getCurrentUser as fetchCurrentUser,
  logoutUser,
} from '../../services/authApi';

const getErrorMessage = error => {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    'Something went wrong'
  );
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      return await loginUser(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/currentUser',
  async (_, thunkAPI) => {
    try {
      return await fetchCurrentUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await logoutUser();
    } catch (error) {
      // Backend logout başarısız olsa bile client tarafındaki
      // oturumu temizlememiz gerekiyor.
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);
