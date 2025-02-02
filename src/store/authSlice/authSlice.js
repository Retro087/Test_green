import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idInstance: "",
  apiTokenInstance: "",
  isAuth: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onAuth: (state, action) => {
      state.apiTokenInstance = action.payload.apiTokenInstance;
      state.idInstance = action.payload.idInstance;
      state.isAuth = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
