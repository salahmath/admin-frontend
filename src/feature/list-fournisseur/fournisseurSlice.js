import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FournisseurService from "./fournisseurService";



export const getfournisseur = createAsyncThunk(
    "fournisseur/getallfournisseur",
    async(thunkAPI)=>{
        try{
return await FournisseurService.getAllfournisseur();
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
const initialState = {
    fournisseur: [],
    isError: false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const FournisseurSlide= createSlice({
    name : "fournisseur",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getfournisseur.pending ,(state)=>{
            state.isLoading = true;
            } )
            .addCase(getfournisseur.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError=false;
                state.fournisseur= action.payload;
                } )
                .addCase(getfournisseur.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError=true;
                    state.message = action.error;
                    } )
    },
})

export default FournisseurSlide.reducer;