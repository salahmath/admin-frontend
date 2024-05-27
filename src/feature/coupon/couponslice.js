import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./couponservice";
import { toast } from "react-toastify";

export const getcoupon = createAsyncThunk(
    "coupon/getallcoupon",
    async(thunkAPI)=>{
        try{
return await couponService.getAllcoupons();
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)



export const creecoupon = createAsyncThunk(
    "coupon/creecoupon",
    async(data,thunkAPI)=>{
        console.log(data);
        try{
            
return await couponService.creecoupon(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const getacoupon = createAsyncThunk(
    "coupon/getcoupon",
    async(data,thunkAPI)=>{
        console.log(data);
        try{
return await couponService.getcoupon(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const updatecoupon = createAsyncThunk(
    "coupon/upatecoupon",
    async(data,thunkAPI)=>{
        try{
return await couponService.updatecoupon(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const delcoupon = createAsyncThunk(
    "coupon/delcoupon",
    async(data,thunkAPI)=>{
        try{
return await couponService.delcoupon(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const reset = createAction("reset_all")
const initialState = {
    coupon: [],
    coupons:[],
    isError: false,
    isupdated:false,
    isLoading:false,
    isSuccess:false,
    ismessage:false,
    message:""
}

export const couponlice= createSlice({
    name : "coupon",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getcoupon.pending ,(state)=>{
            state.isLoading = true;
            } )
            .addCase(getcoupon.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError=false;
                
                state.coupon = action.payload;
                } )
                .addCase(getcoupon.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError=true;
                    state.message = action.error;
                    } ).addCase(creecoupon.pending ,(state)=>{
                        state.isLoading = true;
                        } )
                        .addCase(creecoupon.fulfilled ,(state,action)=>{
                            state.isLoading = false;
                            state.isSuccess = true;
                            state.isError=false;
                            state.ismessage=true;
                            state.coupones = action.payload;
                            toast.success("Coupon ajouter avec succés")
                            } )
                            .addCase(creecoupon.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )
                                
                                .addCase(getacoupon.pending, (state) => {
                                    state.isLoading = true;
                                  })
                                  .addCase(getacoupon.fulfilled, (state, action) => {
                                    state.isLoading = false;
                                    state.isSuccess = true;
                                    state.isError = false;
                                    state.coupon = action.payload;
                                  })
                                  .addCase(getacoupon.rejected, (state, action) => {
                                    state.isLoading = false;
                                    state.isSuccess = false;
                                    state.isError = true;
                                    state.message = action.error;
                                  })
                                            .addCase(updatecoupon.pending ,(state)=>{
                                                state.isLoading = true;
                                                } )
                                                .addCase(updatecoupon.fulfilled ,(state,action)=>{
                                                    state.isLoading = false;
                                                    state.isSuccess = true;
                                                    state.isError=false;
                                                    state.isupdated=true;
                                                    state.couponss = action.payload;
                            toast.success("Coupon modifier avec succés")
                                                    } )
                                                    .addCase(updatecoupon.rejected ,(state,action)=>{
                                                        state.isLoading = false;
                                                        state.isSuccess = false;
                                                        state.isError=true;
                                                        state.message = action.error;
                                                        } )

                                                        .addCase(delcoupon.pending ,(state)=>{
                                                            state.isLoading = true;
                                                            } )
                                                            .addCase(delcoupon.fulfilled ,(state,action)=>{
                                                                state.isLoading = false;
                                                                state.isSuccess = true;
                                                                state.isError=false;
                                                                state.couponssa = action.payload;
                            toast.success("Coupon supprimer avec succés")

                                                                } )
                                                                .addCase(delcoupon.rejected ,(state,action)=>{
                                                                    state.isLoading = false;
                                                                    state.isSuccess = false;
                                                                    state.isError=true;
                                                                    state.message = action.error;
                                                                    } )
                                            .addCase(reset ,()=> initialState)
    },
})

export default couponlice.reducer;