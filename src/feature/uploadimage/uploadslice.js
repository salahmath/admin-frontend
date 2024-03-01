import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import uploasService from "./uploadservice";

export const uploads = createAsyncThunk(
    "upload/images",
    async(data,thunkAPI)=>{
        try{
            const formdata = new FormData();
            for(let i =0; i<data.length;i++){
                formdata.append("images",data[i])
            }
return await uploasService.uploadimg(formdata);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const deleteimg = createAsyncThunk(
    "delete/images",
    async(id,thunkAPI)=>{
        try{
           
return await uploasService.deleteimg(id);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
const initialState = {
    uploads: [],
    isError: false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const uploadslice= createSlice({
    name : "upload",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{
        builder
        .addCase(uploads.pending ,(state)=>{
            state.isLoading = true;
            } )
            .addCase(uploads.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError=false;
                state.uploads= action.payload;
                } )
                .addCase(uploads.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError=true;
                    state.message = action.error;
                    } ).addCase(deleteimg.pending ,(state)=>{
                        state.isLoading = true;
                        } )
                        .addCase(deleteimg.fulfilled ,(state,action)=>{
                            state.isLoading = false;
                            state.isSuccess = true;
                            state.isError=false;
                            state.uploads= [];
                            } )
                            .addCase(deleteimg.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )
    },
})

export default uploadslice.reducer;