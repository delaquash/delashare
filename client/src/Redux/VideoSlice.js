import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const videoSlice = createSlice({
    name: "currentVideo", 
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
    }
})

export const { fetchStart, fetchFail, fetchSuccess } = videoSlice.actions

export default videoSlice.reducer;