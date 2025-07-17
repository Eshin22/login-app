import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: null },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        if (user) state.userInfo = JSON.parse(user);
      }
    },
  },
});

export const { setUser, logout, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
