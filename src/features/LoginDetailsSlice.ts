import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
    IsLoggedin: any;
    Token:any;
    UserType:any;
  }

  const initialState: LoadingState = {
    IsLoggedin: localStorage.getItem("IsLoggedin")?localStorage.getItem("IsLoggedin"):"false",
    Token:localStorage.getItem("Token"),
    UserType:localStorage.getItem("UserType")
  };

  const LoginDetailsSlice=createSlice({
    name: 'loginDetails',
    initialState,
    reducers: {
      setLoggedIn: (state, action: PayloadAction<any>) => {
        localStorage.setItem("IsLoggedin",action.payload.IsLoggedin)
        localStorage.setItem("Token",JSON.stringify(action.payload.Token))
        localStorage.setItem("UserType",action.payload.UserType)
        state.IsLoggedin = action.payload.IsLoggedin;
        state.Token = JSON.stringify(action.payload.Token);
        state.UserType = action.payload.UserType;
      },
      setLoggedOut:(state, action: PayloadAction<any>) => {
        localStorage.setItem("IsLoggedin",action.payload)
        localStorage.removeItem("Token")
        localStorage.removeItem("UserType")
        state.IsLoggedin = action.payload;
        state.Token = "";
        state.UserType = null;
      },
    },
  })
  
  export const { setLoggedIn,setLoggedOut } = LoginDetailsSlice.actions;
  export default LoginDetailsSlice.reducer;
  