import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false, 
    userData: null, 
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData; 
        },
        // this function will run when a user logs out.
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

// export the actions to be dispatched
export const { login, logout } = authSlice.actions;

// export the reducer to be included in the store
export default authSlice.reducer;