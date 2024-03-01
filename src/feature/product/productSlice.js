import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "./productService";

export const getProduct = createAsyncThunk(
    "product/getallproduct",
    async(thunkAPI)=>{
        try{
return await ProductService.getAllproduct();
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const createProduct = createAsyncThunk(
    "products/createproduct",
    async(productData,thunkAPI)=>{
        try{
return await ProductService.createproduct(productData);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)
const initialState = {
    products : [],
    isError: false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const ProductSlice= createSlice({
    name : "products",
    initialState,
    reducer:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getProduct.pending ,(state)=>{
            state.isLoading = true;
            } )
            .addCase(getProduct.fulfilled ,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isError=false;
                state.products = action.payload;
                } )
                .addCase(getProduct.rejected ,(state,action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError=true;
                    state.message = action.error;
                    } ).addCase(createProduct.pending ,(state)=>{
                        state.isLoading = true;
                        } )
                        .addCase(createProduct.fulfilled ,(state,action)=>{
                            state.isLoading = false;
                            state.isSuccess = true;
                            state.isError=false;
                            state.products = [];
                            } )
                            .addCase(createProduct.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )
    },
})

export default ProductSlice.reducer;