import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../services/authService.ts';

export const register = createAsyncThunk('auth/register', async (data: { email: string; password: string }) => {
  const response = await registerUser(data);
  localStorage.setItem('token', response.token);
  return response.token;
});

export const login = createAsyncThunk('auth/login', async (data: { email: string; password: string }) => {
  const response = await loginUser(data);
  localStorage.setItem('token', response.token);
  return response.token;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: localStorage.getItem('token') || null },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;