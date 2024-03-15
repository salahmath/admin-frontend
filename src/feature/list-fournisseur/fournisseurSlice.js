import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const crefournisseur = createAsyncThunk(
    "fournisseur/createfournisseur",
    async(data,thunkAPI)=>{
        try{
            console.log(data);
return await FournisseurService.createfournisseur(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getefournisseur = createAsyncThunk(
    "fournisseur/geetfournisseur",
    async(data,thunkAPI)=>{
        console.log(data);

        try{
return await FournisseurService.getafournisseur(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const updfournisseur = createAsyncThunk(
    "fournisseur/upfournisseur",
    async(data,thunkAPI)=>{
        try{
return await FournisseurService.upfournisseur(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const delfournisseur = createAsyncThunk(
    "fournisseur/delournisseur",
    async(data,thunkAPI)=>{
        try{
return await FournisseurService.delfournisseur(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
const initialState = {
    fournisseur: [],
    get_fournisseur:[],
    isError: false,
    isLoading:false,
    isSuccess:false,
    isupdated:false,
    ismessage:false,
    message:""
}
export const exportesState = createAction("Reset_all")
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

                    .addCase(crefournisseur.pending ,(state)=>{
                        state.isLoading = true;
                        } )
                        .addCase(crefournisseur.fulfilled ,(state,action)=>{
                            state.isLoading = false;
                            state.isSuccess = true;
                            state.ismessage = true;
                            state.isError=false;
                            state.cree_fournisseur= action.payload;
                            } )
                            .addCase(crefournisseur.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )

                                .addCase(getefournisseur.pending ,(state)=>{
                                    state.isLoading = true;
                                    } )
                                    .addCase(getefournisseur.fulfilled ,(state,action)=>{
                                        state.isLoading = false;
                                        state.isSuccess = true;
                                        state.isError=false;
                                        state.get_fournisseur= action.payload;
                                        } )
                                        .addCase(getefournisseur.rejected ,(state,action)=>{
                                            state.isLoading = false;
                                            state.isSuccess = false;
                                            state.isError=true;
                                            state.message = action.error;
                                            } )

                                            
                                .addCase(updfournisseur.pending ,(state)=>{
                                    state.isLoading = true;
                                    } )
                                    .addCase(updfournisseur.fulfilled ,(state,action)=>{
                                        state.isLoading = false;
                                        state.isSuccess = true;
                                        state.isupdated = true;
                                        state.isError=false;
                                        state.get_fournisseur= action.payload;
                                        } )
                                        .addCase(updfournisseur.rejected ,(state,action)=>{
                                            state.isLoading = false;
                                            state.isSuccess = false;
                                            state.isError=true;
                                            state.message = action.error;
                                            } )


                                            .addCase(delfournisseur.pending ,(state)=>{
                                                state.isLoading = true;
                                                } )
                                                .addCase(delfournisseur.fulfilled ,(state,action)=>{
                                                    state.isLoading = false;
                                                    state.isSuccess = true;
                                                    state.isError=false;
                                                    state.get_fournisseur= action.payload;
                                                    } )
                                                    .addCase(delfournisseur.rejected ,(state,action)=>{
                                                        state.isLoading = false;
                                                        state.isSuccess = false;
                                                        state.isError=true;
                                                        state.message = action.error;
                                                        } )
                                            .addCase(exportesState, () => initialState)
    },
})

export default FournisseurSlide.reducer;