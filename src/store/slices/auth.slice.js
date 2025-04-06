import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LoginUser: (state, action)=>{
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user',JSON.stringify(action.payload.user));
      localStorage.setItem('token',JSON.stringify(action.payload.token));
    },
    LogoutUser: (state)=>{
      state.user === null;
      state.token === null;
      localStorage.setItem('user', null);
      localStorage.setItem('token', null);
    }
  }
})

export const {LoginUser, LogoutUser} = authSlice.actions;
export default authSlice.reducer;