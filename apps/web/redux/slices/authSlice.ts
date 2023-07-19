import { AuthenticatedUser } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  user: null,
} as AuthenticatedUser;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state: AuthenticatedUser,
      action: PayloadAction<AuthenticatedUser>
    ) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    },
    removeUser: (state: AuthenticatedUser) => {
      state.user = null;
      state.access_token = null;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
