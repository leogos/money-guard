import { createSlice } from '@reduxjs/toolkit';

import { register, login, getCurrentUser, logout } from './authOperations';

const initialState = {
  user: {
    username: null,
    email: null,
    balance: 0,
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth(state) {
      state.user = {
        username: null,
        email: null,
        balance: 0,
      };
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = null;
    },

    clearAuthError(state) {
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      
      .addCase(getCurrentUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })

      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.user = {
          username: null,
          email: null,
          balance: 0,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(logout.rejected, state => {
        
        state.user = {
          username: null,
          email: null,
          balance: 0,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = null;
      });
  },
});

export const { clearAuth, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
