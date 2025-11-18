import { createSlice } from "@reduxjs/toolkit";

const storedData = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedData?.user || null,
    token: storedData?.token || null,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;

      localStorage.setItem(
        "user",
        JSON.stringify({
          user: payload.user,
          token: payload.token,
        })
      );
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
