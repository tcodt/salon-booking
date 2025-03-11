import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  phoneNumber: string;
  password: string;
}

const initialState: AuthState = {
  userId: null,
  phoneNumber: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{
        userId: string;
        phoneNumber: string;
        password: string;
      }>
    ) => {
      state.userId = action.payload.userId;
      state.phoneNumber = action.payload.phoneNumber;
      state.password = action.payload.password;
    },
    resetAuthData: (state) => {
      state.userId = null;
      state.phoneNumber = "";
      state.password = "";
    },
  },
});

export const { setAuthData, resetAuthData } = authSlice.actions;
export default authSlice.reducer;
