import { createSlice } from "@reduxjs/toolkit";
import { STATES } from "mongoose";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const videoSlice = createSlice({
    name: "video", 
    initialState, 
    reducers: {
        fetchStart:(state)=> {
            /* Setting the loading property of the state to true. */
            state.loading= true;
        },
        fetchSuccess:(state,action) => {
            state.loading = false; 
            state.currentVideo = action.payload
        },
        fetchFail: (state) => {
            state.loading = false;
            state.error = true
        },
        like: (state, action)=> {
            if(!STATES.currentVideo.likes.includes(action.payload)){
                
            }
        }
    }
})

export const { fetchStart, fetchFail, fetchSuccess } = videoSlice.actions

export default videoSlice.reducer;