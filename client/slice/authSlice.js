import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  token: localStorage.getItem("authToken")
    ? JSON.parse(localStorage.getItem("authToken"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setLoading, setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
