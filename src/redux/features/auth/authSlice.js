import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        logged: false,
        loaded: true
    },
    reducers: {
        login: (state) => {
            state.logged = true;
        },
        signup: (state) => {
            state.logged = true;
        },
        logout: (state) => {
            state.logged = false;
        },
    }
});

export const { login, signup, logout } = authSlice.actions;

export default authSlice.reducer;