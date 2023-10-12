import { createSlice } from "@reduxjs/toolkit";
import { registerUser, logIn, logOut, refreshUser } from './operations';

const registerFulfield = (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isLoggedIn = true;
};

const logInFulfilled = (state, action) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.isLoggedIn = true;
};

const logOutFulfilled = (state) => {
    state.user = "";
    state.token = "";
    state.isLoggedIn = false;
};

const refreshPending = (state) => {
    state.isRefreshing = true;
};
const refreshFulfilled = (state, action) => {
    state.user = action.payload;
    state.isLoggedIn = true;
    state.isRefreshing = false;
};
const refreshRejected = (state) => {
    state.isRefreshing = false;
};


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {name: null, email: null},
        token: null,
        isLoggedIn: false,
    },
    extraReducers: builder => builder
    .addCase(registerUser.fulfilled, registerFulfield)
    .addCase(logIn.fulfilled, logInFulfilled)
    .addCase(logOut.fulfilled, logOutFulfilled)
    .addCase(refreshUser.pending, refreshPending)
    .addCase(refreshUser.fulfilled, refreshFulfilled)
    .addCase(refreshUser.rejected, refreshRejected)
});


export const authReducer = authSlice.reducer;