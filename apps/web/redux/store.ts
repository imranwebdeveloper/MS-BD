import { configureStore } from "@reduxjs/toolkit";
import { adminApiSlice } from "./api/adminApiSlice";
import mobileReducer from "./slices/mobileSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    mobileInfo: mobileReducer,
    auth: authReducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
