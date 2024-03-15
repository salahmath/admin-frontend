import { createAction,createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import authservice from "./authservice";


const getuserlocalstorage = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null


const initialState = {
    user : getuserlocalstorage,
    order: [],
    user1: [],
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
export const getuser = createAsyncThunk(
    "auth/admin-profil",
    async(user,thunkAPI)=>{
        try{
return await authservice.getauser(user)
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const getauser = createAsyncThunk(
    "auth/getauser",
    async(user,thunkAPI)=>{
        try{
return await authservice.getuser(user)
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const getuserid = createAsyncThunk(
    "auth/getuserid",
    async (id,thunkAPI) => {
      try {
        await authservice.getusebyid(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
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
export const logaut = createAction("reset_all");
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

                                .addCase(getauser.pending ,(state)=>{
                                    state.isLoading = true;
                                    } )
                                    .addCase(getauser.fulfilled ,(state,action)=>{
                                        state.isLoading = false;
                                        state.isSuccess = true;
                                        state.isError=false;
                                        state.nor_user= action.payload;
                                        } )
                                        .addCase(getauser.rejected ,(state,action)=>{
                                            state.isLoading = false;
                                            state.isSuccess = false;
                                            state.isError=true;
                                            state.message = action.error;
                                            } )

                                            .addCase(getuserid.pending ,(state)=>{
                                                state.isLoading = true;
                                                } )
                                                .addCase(getuserid.fulfilled ,(state,action)=>{
                                                    state.isLoading = false;
                                                    state.isSuccess = true;
                                                    state.isError=false;
                                                    state.userbyid= action.payload;
                                                    state.message="success"
                                                    } )
                                                    .addCase(getuserid.rejected ,(state,action)=>{
                                                        state.isLoading = false;
                                                        state.isSuccess = false;
                                                        state.isError=true;
                                                        state.message = action.error;
                                                        } )
                                                        .addCase(getuser.pending ,(state)=>{
                                                            state.isLoading = true;
                                                            } )
                                                            .addCase(getuser.fulfilled ,(state,action)=>{
                                                                state.isLoading = false;
                                                                state.isSuccess = true;
                                                                state.isError=false;
                                                                state.nor_user= action.payload;
                                                                } )
                                                                .addCase(getuser.rejected ,(state,action)=>{
                                                                    state.isLoading = false;
                                                                    state.isSuccess = false;
                                                                    state.isError=true;
                                                                    state.message = action.error;
                                                                    } ).addCase(logaut, () => initialState);
        }
    }
)
export default authSlice.reducer ;