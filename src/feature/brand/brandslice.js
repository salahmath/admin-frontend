import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "./brandservice";
import { exporState } from "../blob/blobSlice";

export const getbrands = createAsyncThunk(
  "brand/getallbrand",
  async (thunkAPI) => {
    try {
      return await brandService.getAllbrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getabrand = createAsyncThunk(
  "brand/getabrand",
  async (id, thunkAPI) => {
    try {
      return await brandService.getAbrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatebrand = createAsyncThunk(
  "brand/updateabrand",

  async (upda, thunkAPI) => {
    try {
      return await brandService.updatebrand(upda);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const creebrands = createAsyncThunk(
  "brand/creebrand",

  async (data, thunkAPI) => {
    try {
      return await brandService.creebrands(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)
export const deletebrands = createAsyncThunk(
    "brand/delleebrand",
  
    async (data, thunkAPI) => {
      try {
        return await brandService.deletebrand(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
export const reset = createAction("reset_all");
const initialState = {
  brands: [],
  updatebrands:[],
  isError: false,
  isupdate:false,
  isLoading: false,
  isSuccess: false,
  ismessage: false,
  message: "",
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getbrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getbrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
      })
      .addCase(getbrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(creebrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creebrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.ismessage = true;
        state.brands = action.payload;
      })
      .addCase(creebrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(getabrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getabrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brandName = action.payload.name;
      })
      .addCase(getabrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updatebrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatebrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isupdate=true;
        state.updatebrands = action.payload.name;
      })
      .addCase(updatebrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      }) .addCase(deletebrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletebrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletebrands = action.payload;
      })
      .addCase(deletebrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(reset, () => initialState);
  },
});

export default brandSlice.reducer;
