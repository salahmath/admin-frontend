import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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


export const getablogs = createAsyncThunk(
    "blog/getablog",
    async(data,thunkAPI)=>{
        try{
return await blogService.getblogs(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const deleteblogs = createAsyncThunk(
    "blog/dekablog",
    async(data,thunkAPI)=>{
        try{
return await blogService.delblogs(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateablogs = createAsyncThunk(
    "blog/updablog",
    async(data,thunkAPI)=>{
        try{
return await blogService.updateblogs(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const exporState = createAction("Reset_all")
const initialState = {
    blog: [],
    blogs:[],
    isError: false,
    isLoading:false,
    isSuccess:false,
    ismessage:false,
    message:""
}



export const blogSlice = createSlice({
    name : "blogs",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getblogs.pending ,(state)=>{
            state.isLoading = true;
        })
        .addCase(getblogs.fulfilled ,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError=false;
            state.blog= action.payload;
        })
        .addCase(getblogs.rejected ,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError=true;
            state.message = action.error;
        })
        .addCase(creeblogs.pending ,(state)=>{
            state.isLoading = true;
        })
        .addCase(creeblogs.fulfilled ,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError=false;
            state.ismessage=true;
            state.crblog= action.payload;
        })
        .addCase(creeblogs.rejected ,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError=true;
            state.message = action.error;
           
        })
        
        .addCase(getablogs.pending ,(state)=>{
            state.isLoading = true;
        })
        .addCase(getablogs.fulfilled ,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError=false;
            state.ismessage=true;
            state.blogs= action.payload;
            state.ima= action.payload.image;


        })
        .addCase(getablogs.rejected ,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError=true;
            state.message = action.error})

            .addCase(updateablogs.pending ,(state)=>{
                state.isLoading = true;
            })
            .addCase(updateablogs.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError=false;
                state.isupdated=true;
                state.upblogs= action.payload;
            })
            .addCase(updateablogs.rejected ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError=true;
                state.message = action.error})


                .addCase(deleteblogs.pending ,(state)=>{
                    state.isLoading = true;
                })
                .addCase(deleteblogs.fulfilled ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError=false;
                    state.bloges= action.payload
                })
                .addCase(deleteblogs.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError=true;
                    state.message = action.error})
        .addCase(exporState, () => initialState) 
        
    },
})

export default blogSlice.reducer;