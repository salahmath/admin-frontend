import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import CategoryService from "./categoryService";

export const getcategories = createAsyncThunk(
  "category/getallcategory",
  async (thunkAPI) => {
    try {
      return await CategoryService.getAllcategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getacategories = createAsyncThunk(
  "category/getacategory",
  async (id, thunkAPI) => {
    try {
      return await CategoryService.getacategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delcategorie = createAsyncThunk(
    "category/delcategory",
    async (id, thunkAPI) => {
      try {
        return await CategoryService.deleteacategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
export const creecategories = createAsyncThunk(
  "category/creecategory",
  async (adata, thunkAPI) => {
    try {
      console.log(adata);
      return await CategoryService.ajoutcategory(adata);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatecategorie = createAsyncThunk(
  "category/updatecategory",
  async (data, thunkAPI) => {
    try {
      return await CategoryService.updatecategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetstt = createAction("reset_all");
const initialState = {
  category: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  isupdeted: false,
  ismessage: false,
  message: "",
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.category = action.payload;
      })
      .addCase(getcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(creecategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creecategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.ismessage = true;
        state.category = action.payload;
      })
      .addCase(creecategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(getacategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getacategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isgeted = true;
        state.categorys = action.payload.name;
      })
      .addCase(getacategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(updatecategorie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatecategorie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isupdeted = true;
        state.category = action.payload.name;
      })
      .addCase(updatecategorie.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(delcategorie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delcategorie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        
        state.category = action.payload;
      })
      .addCase(delcategorie.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetstt, () => initialState);
  },
});

export default CategorySlice.reducer;
