import { createSlice } from "@reduxjs/toolkit";
// import { STATES } from "mongoose";

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
            state.currentUser= null;
            state.loading= false;
            state.error= false;
        },
        subscription: (state, action) =>  {
            if(state.currentUser.subscribedUser.includes(action.payload)){
                state.currentUser.subscribedUser.splice(
                state.currentUser.subscribedUser.fndIndex(
                    (channelId)=> channelId=== action.payload
                ),
                1
              )
            } else {
                state.currentUser.subscribedUser.push(action.payload)
            }
        },
        // unsubscription: (state, action) => {
        //     if(state.currentUser)
        // }
    }
})

export const { loginStart, loginFail, loginSuccess, logOut, subscription } = userSlice.actions;
export default userSlice.reducer