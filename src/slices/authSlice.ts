import { createSelector, createSlice } from "@reduxjs/toolkit";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { Owner } from "../models";
import { RootState } from "../store/store";

const cookies = parseCookies();

// let token = null
// let user = null
// if (process.browser) {
//   token = localStorage.getItem("userToken")
//   user = localStorage.getItem("user")
// }
interface AuthState {
  token: string;
  user: Owner | null;
}

const initialState: AuthState = {
  // token: token ? JSON.parse(token) : "",
  // user: user ? JSON.parse(user) : undefined,
  token: "",
  user: null,
};

// console.log("inital:", initialState)

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      setCookie(null, "userToken", action.payload.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    },
    logout: (state) => {
      // destroyCookie(null, "userToken");
      state.token = initialState.token;
      state.user = initialState.user;
    },
  },
});

export const useCurrentUser = createSelector(
  (state: RootState) => state.auth.user,
  (user) => {
    return user;
  }
);

export const { login, logout, updateUser } = AuthSlice.actions;
export default AuthSlice.reducer;
