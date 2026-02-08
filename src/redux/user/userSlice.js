import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload.user_details;
      state.loading = false;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    clearState(state, action) {
      state.currentUser = null;
      state.error = null;
    }
  },
});

export const { signInStart, signInSuccess, signInFailure, logoutUser, clearState } = userSlice.actions;
export default userSlice.reducer;
