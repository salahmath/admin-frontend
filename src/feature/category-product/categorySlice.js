import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import CategoryService from "./categoryService";

export const getcategories = createAsyncThunk(
    "category/getallcategory",
    async(thunkAPI)=>{
        try{
return await CategoryService.getAllcategory();
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const creecategories = createAsyncThunk(
    "category/creecategory",
    async(data,thunkAPI)=>{
        try{
return await CategoryService.ajoutcategory(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
const initialState = {
    category: [],
    isError: false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const CategorySlice= createSlice({
    name : "category",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getcategories.pending ,(state)=>{
            state.isLoading = true;
            } )
            .addCase(getcategories.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError=false;
                state.category= action.payload;
                } )
                .addCase(getcategories.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError=true;
                    state.message = action.error;
                    } ).addCase(creecategories.pending ,(state)=>{
                        state.isLoading = true;
                        } )
                        .addCase(creecategories.fulfilled ,(state,action)=>{
                            state.isLoading = false;
                            state.isSuccess = true;
                            state.isError=false;
                            state.category= action.payload;
                            } )
                            .addCase(creecategories.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )
    },
})

export default CategorySlice.reducer;