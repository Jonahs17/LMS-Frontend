import { createSlice } from "@reduxjs/toolkit"

const initailState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem('role')  || "",
    data : localStorage.getItem('data')  || {} 
}

const authSlice = createSlice({
    name: "auth",
    initialState: initailState,
    reducers: {}
}
);

export default authSlice.reducer;