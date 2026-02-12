import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.ts';
import issuesReducer from './issueSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    issues: issuesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;