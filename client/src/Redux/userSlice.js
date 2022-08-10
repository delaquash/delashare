import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: "currentUser", 
    initialState, 
    reducers: {
        loginStart:(state)=> {
            /* Setting the loading property of the state to true. */
            state.loading= true;
        },
        loginSuccess:(state,action) => {
            state.loading = false;
            state.currentUser = action.payload
        },
        loginFail: (state) => {
            state.loading = false;
            state.error = true
        },
        logOut:(state) => {
            return initialState;
        }
    }
})

export const { loginStart, loginFail, loginSuccess, logOut } = userSlice.actions

export default userSlice.reducer