import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import enquiryservice from "./enquiryservice";
import { toast } from "react-toastify";


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

export const deleteenquirys = createAsyncThunk(
    "enquiry/delenquiries",
    async(data,thunkAPI)=>{
        try{
return await enquiryservice.delenquirys(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const geteteenquirys = createAsyncThunk(
    "enquiry/getenquiries",
    async(data,thunkAPI)=>{
        try{
return await enquiryservice.getenquirys(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const messages = createAsyncThunk(
    "enquiry/messages",
    async(data,thunkAPI)=>{
        try{
return await enquiryservice.essage(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)



export const updtenquirys = createAsyncThunk(
    "enquiry/upenquiries",
    async(data,thunkAPI)=>{
        try{
return await enquiryservice.updenquirys(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    enquiry: [],
    get_a_enquiry:[],
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
                    } ).addCase(deleteenquirys.pending ,(state)=>{
                        state.isLoading = true;
                        } )
                        .addCase(deleteenquirys.fulfilled ,(state,action)=>{
                            state.isLoading = false;
                            state.isSuccess = true;
                            state.isError=false;
                            state.enquiry= action.payload;
                            } )
                            .addCase(deleteenquirys.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )

                                .addCase(geteteenquirys.pending ,(state)=>{
                                    state.isLoading = true;
                                    } )
                                    .addCase(geteteenquirys.fulfilled ,(state,action)=>{
                                        state.isLoading = false;
                                        state.isSuccess = true;
                                        state.isError=false;
                                        state.get_a_enquiry= action.payload;
                                        } )
                                        .addCase(geteteenquirys.rejected ,(state,action)=>{
                                            state.isLoading = false;
                                            state.isSuccess = false;
                                            state.isError=true;
                                            state.message = action.error;
                                            } )

                                            .addCase(updtenquirys.pending ,(state)=>{
                                                state.isLoading = true;
                                                } )
                                                .addCase(updtenquirys.fulfilled ,(state,action)=>{
                                                    state.isLoading = false;
                                                    state.isSuccess = true;
                                                    state.isError=false;
                                                    state.up_a_enquiry= action.payload;
                                                    toast.success("L'enquête a été mise à jour avec succès.");
                                                    } )
                                                    .addCase(updtenquirys.rejected ,(state,action)=>{
                                                        state.isLoading = false;
                                                        state.isSuccess = false;
                                                        state.isError=true;
                                                        state.message = action.error;
                                                        toast.error("Ilya un erreur ");

                                                        } )



                                                        .addCase(messages.pending ,(state)=>{
                                                            state.isLoading = true;
                                                            } )
                                                            .addCase(messages.fulfilled ,(state,action)=>{
                                                                state.isLoading = false;
                                                                state.isSuccess = true;
                                                                state.isError=false;
                                                                state.reponse= action.payload;
                                                                toast.success("Reponse envoyer avec succès.");

                                                                } )
                                                                .addCase(messages.rejected ,(state,action)=>{
                                                                    state.isLoading = false;
                                                                    state.isSuccess = false;
                                                                    state.isError=true;
                                                                    state.message = action.error;
                                                                    toast.error("Ilya un erreur ");

                                                                    } )
    },
})

export default enquirySlice.reducer;