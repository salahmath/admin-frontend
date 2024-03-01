import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryblogService from "./bloglistservice";




export const getcategoryblog = createAsyncThunk(
    "categoryblog/getallcategoryblog",
    async(thunkAPI)=>{
        try{
return await categoryblogService.getAllcategoryblog();
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const creecategoryblog = createAsyncThunk(
    "categoryblog/creeallcategoryblog",
    async(data,thunkAPI)=>{
        try{
return await categoryblogService.creecategoryblog(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
const initialState = {
    category_blog: [],
    isError: false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const categoryblogSlide= createSlice({
    name : "categoryblog",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getcategoryblog.pending ,(state)=>{
            state.isLoading = true;
            } )
            .addCase(getcategoryblog.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError=false;
                state.category_blog= action.payload;
                } )
                .addCase(getcategoryblog.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError=true;
                    state.message = action.error;
                    } ).addCase(creecategoryblog.pending ,(state)=>{
                        state.isLoading = true;
                        } )
                        .addCase(creecategoryblog.fulfilled ,(state,action)=>{
                            state.isLoading = false;
                            state.isSuccess = true;
                            state.isError=false;
                            state.category_blog= action.payload;
                            } )
                            .addCase(creecategoryblog.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )
    },
})

export default categoryblogSlide.reducer;