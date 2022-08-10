import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const videoSlice = createSlice({
    name: "currentUser", 
    initialState, 
    reducers: {
      
    }
})

export const { loginStart, loginFail, loginSuccess, logOut } = videoSlice.actions

export default videoSlice.reducer;