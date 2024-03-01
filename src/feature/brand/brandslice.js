import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "./brandservice";

export const getbrands = createAsyncThunk(
    "brand/getallbrand",
    async(thunkAPI)=>{
        try{
return await brandService.getAllbrands();
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)



export const creebrands = createAsyncThunk(
    "brand/creebrand",
    async(data,thunkAPI)=>{
        try{
return await brandService.creebrands(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    brands: [],
    isError: false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const brandSlice= createSlice({
    name : "brand",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getbrands.pending ,(state)=>{
            state.isLoading = true;
            } )
            .addCase(getbrands.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError=false;
                state.brands = action.payload;
                } )
                .addCase(getbrands.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError=true;
                    state.message = action.error;
                    } ).addCase(creebrands.pending ,(state)=>{
                        state.isLoading = true;
                        } )
                        .addCase(creebrands.fulfilled ,(state,action)=>{
                            state.isLoading = false;
                            state.isSuccess = true;
                            state.isError=false;
                            state.brands = action.payload;
                            } )
                            .addCase(creebrands.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )
    },
})

export default brandSlice.reducer;