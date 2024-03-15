import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import custermerService from "./customerservice";

export const getUsers = createAsyncThunk(
    "custemrs/getallcustomrs",
    async(thunkAPI)=>{
        try{
return await custermerService.getAllusers();
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const delUsers = createAsyncThunk(
    "custemrs/delcustomrs",
    async(data,thunkAPI)=>{
        try{
return await custermerService.delusers(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
const initialState = {
    customers : [],
    isError: false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const custermerSlice= createSlice({
    name : "users",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getUsers.pending ,(state)=>{
            state.isLoading = true;
            } )
            .addCase(getUsers.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError=false;
                state.customers = action.payload;
                } )
                .addCase(getUsers.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError=true;
                    state.message = action.error;
                    } ).addCase(delUsers.pending ,(state)=>{
                        state.isLoading = true;
                        } )
                        .addCase(delUsers.fulfilled ,(state,action)=>{
                            state.isLoading = false;
                            state.isSuccess = true;
                            state.isError=false;
                            state.customers = action.payload;
                            } )
                            .addCase(delUsers.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )
    },
})

export default custermerSlice.reducer;