import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SignupReducer from "../slices/signupSlice";
import AuthReducer from "../slices/authSlice";
import storage from "redux-persist/lib/storage";

import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const reducers = combineReducers({
  signup: SignupReducer,
  auth: AuthReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["signup/addUserData", FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these paths in the state
        ignoredPathes: ["signup.user.profileImage", "register"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
