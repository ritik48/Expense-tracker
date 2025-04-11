import { createSlice } from "@reduxjs/toolkit";
import { createAccount, isCredentialValid, logoutUser } from "./helper";
import { User } from "@/type";

const savedAuthState = JSON.parse(localStorage.getItem("auth") || "{}");

const EXPIRES_IN = 20 * 60 * 1000;

const initialState: User = {
  name: savedAuthState.name || "",
  email: savedAuthState.email || "",
  expiresAt: savedAuthState.expiresAt || 0,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { email, password } = action.payload;

      if (!email || !password) throw new Error("Invalid credential");
      const expiresAt = Date.now() + EXPIRES_IN;
      const data = isCredentialValid(email, password, expiresAt);

      if (data.error) {
        throw new Error(data.error);
      }
      if (!data.error) {
        state.name = data.name!;
        state.expiresAt = expiresAt;
        state.email = data.email!;
      }
    },
    signup(state, action) {
      const { email, password, name } = action.payload;

      if (!email || !password || !name)
        throw new Error("Please provide all the fields.");

      const expiresAt = Date.now() + EXPIRES_IN;
      const data = createAccount(email, password, name, expiresAt);

      if (data.error) {
        throw new Error(data.error);
      }
      state.name = name;
      state.expiresAt = expiresAt;
      state.email = email;
    },
    logoOut(state) {
      logoutUser();
      state.name = "";
      state.expiresAt = 0;
    },
  },
});

export const { login, logoOut, signup } = userSlice.actions;
export default userSlice.reducer;
