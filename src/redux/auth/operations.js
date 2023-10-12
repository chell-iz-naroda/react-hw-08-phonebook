import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";


const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};




export const registerUser = createAsyncThunk(
    'auth/register',
    async (details, thunkAPI) => {
        try {
            const result = await axios.post('/users/signup', details);
            setAuthHeader(result.data.token);
            console.log(result.data);
            return result.data;
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const logIn = createAsyncThunk(
    'auth/login',
    async (details, thunkAPI) => {
        try {
            const result = await axios.post('/users/login', details);
            setAuthHeader(result.data.token);
            return result.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.post('/users/logout');
        clearAuthHeader();
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});


export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        // Reading the token from the state via getState()
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;

        if (persistedToken === null) {
            // If there is no token, exit without performing any request
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }

        try {
            // If there is a token, add it to the HTTP header and perform the request
            setAuthHeader(persistedToken);
            const result = await axios.get('/users/current');
            return result.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
