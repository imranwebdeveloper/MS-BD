import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  access_token: string | null;
  user: {} | null;
}

const initialState = {
  access_token: null,
  user: null,
} as User;
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: User, action: PayloadAction<User>) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
