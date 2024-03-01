import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import authservice from "./authservice";


const getuserlocalstorage = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null


const initialState = {
    user : getuserlocalstorage,
    order: [],
    isError: false,
    isLoading:false,
    isSuccess:false,
    message:""

}

export const login = createAsyncThunk(
    "auth/admin-login",
    async(user,thunkAPI)=>{
        try{
return await authservice.login(user)
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getordrs = createAsyncThunk(
    "order/getallordrs",
    async(thunkAPI)=>{
        try{
return await authservice.getAllorders();
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const authSlice = createSlice(
    {
        name:"auth",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(login.pending ,(state,action)=>{
            state.isLoading = true;
            } )
            .addCase(login.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                } )
                .addCase(login.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isError=true;
                    state.isSuccess=false;
                    state.user = null;

                    } )
                    .addCase(getordrs.pending ,(state)=>{
                        state.isLoading = true;
                        } )
                        .addCase(getordrs.fulfilled ,(state,action)=>{
                            state.isLoading = false;
                            state.isSuccess = true;
                            state.isError=false;
                            state.order= action.payload;
                            } )
                            .addCase(getordrs.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )
        }
    }
)
export default authSlice.reducer ;