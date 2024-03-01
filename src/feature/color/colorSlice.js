import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import coleurService from "./colorService";

export const getcoleur = createAsyncThunk(
    "coleur/getallcoleur",
    async(thunkAPI)=>{
        try{
return await coleurService.getAllcoleur();
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const creatcoleur = createAsyncThunk(
    "coleur/creatcoleur",
    async(data,thunkAPI)=>{
        try{
return await coleurService.creecoleur(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
const initialState = {
    coleur: [],
    isError: false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const ColeurSlice= createSlice({
    name : "coleur",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getcoleur.pending ,(state)=>{
            state.isLoading = true;
            } )
            .addCase(getcoleur.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError=false;
                state.coleur= action.payload;
                } )
                .addCase(getcoleur.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError=true;
                    state.message = action.error;
                    } ) .addCase(creatcoleur.pending ,(state)=>{
                        state.isLoading = true;
                        } )
                        .addCase(creatcoleur.fulfilled ,(state,action)=>{
                            state.isLoading = false;
                            state.isSuccess = true;
                            state.isError=false;
                            state.coleur= action.payload;
                            } )
                            .addCase(creatcoleur.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )
    },
})

export default ColeurSlice.reducer;