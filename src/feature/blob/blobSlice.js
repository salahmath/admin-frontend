import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blobService";

export const getblogs = createAsyncThunk(
    "blog/getallblog",
    async(thunkAPI)=>{
        try{
return await blogService.getAllblogs();
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const creeblogs = createAsyncThunk(
    "blog/creeblog",
    async(data,thunkAPI)=>{
        try{
return await blogService.creeblogs(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
const initialState = {
    blog: [],
    isError: false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const blogSlice= createSlice({
    name : "blogs",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getblogs.pending ,(state)=>{
            state.isLoading = true;
            } )
            .addCase(getblogs.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError=false;
                state.blog= action.payload;
                } )
                .addCase(getblogs.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError=true;
                    state.message = action.error;
                    } ).addCase(creeblogs.pending ,(state)=>{
                        state.isLoading = true;
                        } )
                        .addCase(creeblogs.fulfilled ,(state,action)=>{
                            state.isLoading = false;
                            state.isSuccess = true;
                            state.isError=false;
                            state.blog= action.payload;
                            } )
                            .addCase(creeblogs.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )
                                

    },
})

export default blogSlice.reducer;