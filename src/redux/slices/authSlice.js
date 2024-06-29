import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initailState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem('role')  || "",
    data : localStorage.getItem('data')  || {} 
}


export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
    try {
       const response = axiosInstance.post("/user/register",data) ;
       toast.promise(response,{
        loading: 'Wait, Creating your account',
        success: (data) => {
            return data?.data?.message;
        },
        error: "Failed creation"
       })
       return await response;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState: initailState,
    reducers: {}
}
);

export default authSlice.reducer;