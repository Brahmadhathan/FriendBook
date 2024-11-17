import { createSlice, current } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false,
};

const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true;
        },
        signInsuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart:(state)=>{
            state.loading = true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart:(state)=>{
            state.currentUser = true;
            
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        deleteUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signOutUserStart:(state)=>{
            state.currentUser = true;
            
        },
        signOutUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        signOutUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
    },
});

export const {signInsuccess,
    signInStart,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutUserStart,
    signOutUserFailure,
    signOutUserSuccess} = userSlice.actions;
export default userSlice.reducer;