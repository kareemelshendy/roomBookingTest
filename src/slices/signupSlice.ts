import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models";

interface User {
  user: UserData;
}
const initialState: User = {
  user: {
    name: "",
    phone: "",
    password: "",
    email: "",
    profileImage: undefined,
  },
};
export const SignupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.user = action.payload;
    },
    
  },
});

export const { addUserData } = SignupSlice.actions;

export default SignupSlice.reducer;
