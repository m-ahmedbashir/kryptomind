import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./Features/User/userSlice";
export const Store = configureStore({
  reducer: {
    user: userAuth,
  },
});
