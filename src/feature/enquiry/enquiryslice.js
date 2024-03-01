import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import enquiryservice from "./enquiryservice";

export const getenquirys = createAsyncThunk(
    "enquiry/getallenquiries",
    async(thunkAPI)=>{
        try{
return await enquiryservice.getAllenquirys();
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
const initialState = {
    enquiry: [],
    isError: false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const enquirySlice= createSlice({
    name : "enquiries",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getenquirys.pending ,(state)=>{
            state.isLoading = true;
            } )
            .addCase(getenquirys.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError=false;
                state.enquiry= action.payload;
                } )
                .addCase(getenquirys.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError=true;
                    state.message = action.error;
                    } )
    },
})

export default enquirySlice.reducer;