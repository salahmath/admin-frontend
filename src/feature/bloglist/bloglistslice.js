import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const getacategoryblog = createAsyncThunk(
    "categoryblog/getcategoryblog",
    async(data,thunkAPI)=>{
        try{
return await categoryblogService.getagoryblog(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updatecategoryblog = createAsyncThunk(
    "categoryblog/updcategoryblog",
    async(data,thunkAPI)=>{
        try{
return await categoryblogService.updateategoryblog(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const deltegoryblog = createAsyncThunk(
    "categoryblog/delcategoryblog",
    async(data,thunkAPI)=>{
        try{
return await categoryblogService.deletegoryblog(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const exportState = createAction("Reset_all")
const initialState = {
    category_blog: [],
    category:[],
    isError: false,
    isLoading:false,
    isSuccess:false,
    ismessage:false,
    isupdated:false,
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
                            state.ismessage=true;
                            state.isError=false;
                            state.category= action.payload;
                            } )
                            .addCase(creecategoryblog.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )
                                
                                .addCase(getacategoryblog.pending ,(state)=>{
                                    state.isLoading = true;
                                    } )
                                    .addCase(getacategoryblog.fulfilled ,(state,action)=>{
                                        state.isLoading = false;
                                        state.isSuccess = true;
                                        state.isError=false;
                                        state.categorys= action.payload.name;
                                        } )
                                        .addCase(getacategoryblog.rejected ,(state,action)=>{
                                            state.isLoading = false;
                                            state.isSuccess = false;
                                            state.isError=true;
                                            state.message = action.error;
                                            } )
                                
                                            
                                            .addCase(updatecategoryblog.pending ,(state)=>{
                                                state.isLoading = true;
                                                } )
                                                .addCase(updatecategoryblog.fulfilled ,(state,action)=>{
                                                    state.isLoading = false;
                                                    state.isSuccess = true;
                                                    state.isupdated=true;
                                                    state.isError=false;
                                                    state.categoryl= action.payload.name;
                                                    } )
                                                    .addCase(updatecategoryblog.rejected ,(state,action)=>{
                                                        state.isLoading = false;
                                                        state.isSuccess = false;
                                                        state.isError=true;
                                                        state.message = action.error;
                                                        } )
                                
                                                        
                                                        .addCase(deltegoryblog.pending ,(state)=>{
                                                            state.isLoading = true;
                                                            } )
                                                            .addCase(deltegoryblog.fulfilled ,(state,action)=>{
                                                                state.isLoading = false;
                                                                state.isSuccess = true;
                                                                state.isError=false;
                                                                state.category= action.payload;
                                                                } )
                                                                .addCase(deltegoryblog.rejected ,(state,action)=>{
                                                                    state.isLoading = false;
                                                                    state.isSuccess = false;
                                                                    state.isError=true;
                                                                    state.message = action.error;
                                                                    } )
                                
                                                                    
                                .addCase(exportState, () => initialState)
    },
})

export default categoryblogSlide.reducer;