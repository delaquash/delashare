import { createSlice } from "@reduxjs/toolkit";

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
            if(!state.currentVideo.like.includes(action.payload)){
                state.currentVideo.like.push(action.payload);
                state.currentVideo.dislike.splice(
                    state.currentVideo.dislike.findIndex(
                        (userId)=> userId === action.payload
                    )
                )
            }
        },
        dislike: (state, action) => {
            if(!state.currentVideo.dislike.includes(action.payload)){
                state.currentVideo.dislike.push(action.payload);
                state.currentVideo.like.splice(
                    state.currentVideo.like.findIndex(
                        (userId)=> userId === action.payload
                    )
                )
            }
        }
    }
})

export const { fetchStart, fetchFail, fetchSuccess, like, dislike } = videoSlice.actions

export default videoSlice.reducer;