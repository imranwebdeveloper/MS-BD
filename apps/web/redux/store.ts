import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./api/adminApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import mobileReducer from "./slices/mobileSlice";
// import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
