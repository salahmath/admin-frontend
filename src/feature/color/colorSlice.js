import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import coleurService from "./colorService";
import { resetstt } from "../category-product/categorySlice";

export const getcoleur = createAsyncThunk(
  "coleur/getallcoleur",
  async (thunkAPI) => {
    try {
      return await coleurService.getAllcoleur();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const creatcoleur = createAsyncThunk(
  "coleur/creatcoleur",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      return await coleurService.creecoleur(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateacoleur = createAsyncThunk(
    "coleur/updatecoleur",
    async (data, thunkAPI) => {
      try {
        return await coleurService.updatecoleur(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  

export const getacoleur = createAsyncThunk(
  "coleur/getacoleur",
  async (data, thunkAPI) => {

    try {
      return await coleurService.getacoleur(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteacouleur = createAsyncThunk(
  "coleur/delcoleur",
  async (data, thunkAPI) => {
    try {
      return await coleurService.deletecoleur(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const initialState = {
  coleur: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  isupdated:false,
  ismessage: false,
  message: "",
};

export const ColeurSlice = createSlice({
  name: "coleur",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcoleur.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcoleur.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coleur = action.payload;
      })
      .addCase(getcoleur.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })


      .addCase(creatcoleur.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creatcoleur.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.ismessage = true;
        state.coleur = action.payload;
      })
      .addCase(creatcoleur.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })


      .addCase(getacoleur.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getacoleur.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coleurs = action.payload.name;
      })
      .addCase(getacoleur.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(updateacoleur.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateacoleur.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isupdated=true;

        state.coleurs = action.payload.name;
      })
      .addCase(updateacoleur.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteacouleur.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteacouleur.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isupdated=true;

        state.coleurs = action.payload;
      })
      .addCase(deleteacouleur.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetstt, () => initialState);
  },
});

export default ColeurSlice.reducer;
