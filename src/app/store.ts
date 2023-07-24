import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../features/LoginSlice";
export const store = configureStore({
  reducer: {
    login: LoginSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
