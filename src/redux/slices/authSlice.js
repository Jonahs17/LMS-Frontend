import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {}, // Ensure this is parsed correctly
    loading: false,
    error: null,
};

export const createAccount = createAsyncThunk('/auth/signup', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/register", data);
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Failed creation";
        return rejectWithValue(message);
    }
});

export const login = createAsyncThunk('/auth/signin', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/login", data);
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Failed to login";
        return rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('/auth/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/logout");
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Failed to logout";
        return rejectWithValue(message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.data = action.payload.user;
                toast.success("Account created successfully!");
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.data = action.payload.user;
                state.role = action.payload.user.role;
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('data', JSON.stringify(action.payload.user));
                localStorage.setItem('role', action.payload.user.role);
                toast.success("Logged in successfully!");
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.data = {};
                state.role = "";
                localStorage.clear();
                toast.success("Logged out successfully!");
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload || "Logout failed");
            });
    }
});

export default authSlice.reducer;
