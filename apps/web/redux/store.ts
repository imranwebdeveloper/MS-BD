import { configureStore } from "@reduxjs/toolkit";
import { adminApiSlice } from "./api/adminApiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import mobileReducer from "./slices/mobileSlice";
// import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
