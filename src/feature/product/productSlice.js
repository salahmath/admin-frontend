import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "./productService";
import { resetstt } from "../category-product/categorySlice";
import { toast } from "react-toastify";

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
export const getaProduct = createAsyncThunk(
    "products/getproduct",
    async(productData,thunkAPI)=>{
        try{
            
return await ProductService.getproduct(productData);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteaProduct = createAsyncThunk(
    "products/delproduct",
    async(productData,thunkAPI)=>{
        try{
           
return await ProductService.delproduct(productData);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const updateaProduct = createAsyncThunk(
    "products/updateaproduct",
    async(productData,thunkAPI)=>{
        try{
return await ProductService.updateproduct(productData);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateaquan2 = createAsyncThunk(
    "products/update_quan_lors_l'annulation",
    async(Data,thunkAPI)=>{
        try{
return await ProductService.updatquan2(Data);
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState = {
    products : [],
    get_aProduct : [],
    isError: false,
    isLoading:false,
    isSuccess:false,
    ismessage:false,
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
                            state.ismessage=true;
                            state.products = [];
                            toast.success('Produit ajouter avec succés')
                            } )
                            .addCase(createProduct.rejected ,(state,action)=>{
                                state.isLoading = false;
                                state.isSuccess = false;
                                state.isError=true;
                                state.message = action.error;
                                } )


                                .addCase(getaProduct.pending ,(state)=>{
                                    state.isLoading = true;
                                    } )
                                    .addCase(getaProduct.fulfilled ,(state,action)=>{
                                        state.isLoading = false;
                                        state.isSuccess = true;
                                        state.isError=false;
                                        state.get_aProduct = action.payload;
                                        state.Image=action.payload.images;
                                        } )
                                        .addCase(getaProduct.rejected ,(state,action)=>{
                                            state.isLoading = false;
                                            state.isSuccess = false;
                                            state.isError=true;
                                            state.message = action.error;
                                            } )
                                
                                            .addCase(updateaProduct.pending ,(state)=>{
                                                state.isLoading = true;
                                                } )
                                                .addCase(updateaProduct.fulfilled ,(state,action)=>{
                                                    state.isLoading = false;
                                                    state.isSuccess = true;
                                                    state.isError=false;
                                                    state.isupdated=false;
                                                    state.up_Product = action.payload;
                            toast.success('Produit modifier avec succés')

                                                    } )
                                                    .addCase(updateaProduct.rejected ,(state,action)=>{
                                                        state.isLoading = false;
                                                        state.isSuccess = false;
                                                        state.isError=true;
                                                        state.message = action.error;
                                                        } )

                                                        .addCase(deleteaProduct.pending ,(state)=>{
                                                            state.isLoading = true;
                                                            } )
                                                            .addCase(deleteaProduct.fulfilled ,(state,action)=>{
                                                                state.isLoading = false;
                                                                state.isSuccess = true;
                                                                state.isError=false;
                                                                state.isupdated=false;
                                                                state.up_Product = action.payload;
                            toast.success('Produit supprimer avec succés')

                                                                } )
                                                                .addCase(deleteaProduct.rejected ,(state,action)=>{
                                                                    state.isLoading = false;
                                                                    state.isSuccess = false;
                                                                    state.isError=true;
                                                                    state.message = action.error;
                                                                    } )
                                

                                                                    .addCase(updateaquan2.pending ,(state)=>{
                                                                        state.isLoading = true;
                                                                        } )
                                                                        .addCase(updateaquan2.fulfilled ,(state,action)=>{
                                                                            state.isLoading = false;
                                                                            state.isSuccess = true;
                                                                            state.isError=false;
                                                                            state.isupdated=false;
                                                                            state.update_Product = action.payload;
                                                                            } )
                                                                            .addCase(updateaquan2.rejected ,(state,action)=>{
                                                                                state.isLoading = false;
                                                                                state.isSuccess = false;
                                                                                state.isError=true;
                                                                                state.message = action.error;
                                                                                } )
                                .addCase(resetstt,()=>initialState)
    },
})

export default ProductSlice.reducer;