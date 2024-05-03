import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authservice from "./authservice";
import { toast } from "react-toastify";

const getuserlocalstorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getuserlocalstorage,
  order: [],
  user1: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkAPI) => {
    try {
      return await authservice.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getuser = createAsyncThunk(
  "auth/admin-profil",
  async (user, thunkAPI) => {
    try {
      return await authservice.getauser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getauser = createAsyncThunk(
  "auth/getauser",
  async (user, thunkAPI) => {
    try {
      return await authservice.getuser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getuserid = createAsyncThunk(
  "auth/getuserid",
  async (id, thunkAPI) => {
    try {
      await authservice.getusebyid(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getordrs = createAsyncThunk(
  "order/getallordrs",
  async (thunkAPI) => {
    try {
      return await authservice.getAllorders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const Getmonth = createAsyncThunk("order/month", async (thunkAPI) => {
  try {
    return await authservice.orderDetails();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const Getmonth2 = createAsyncThunk("order/month2", async (thunkAPI) => {
  try {
    return await authservice.orderDetailsch();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const Getorders= createAsyncThunk("order/getallorders", async (thunkAPI) => {
  try {
    return await authservice.getAllorders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const Getaorder= createAsyncThunk("order/get_order", async (id,thunkAPI) => {
  try {
    return await authservice.Getorderbyuser(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const Udateorder= createAsyncThunk("order/udate_order", async (data,thunkAPI) => {
  try {
    return await authservice.udatestatus(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const Bloquser= createAsyncThunk("order/bloquer user", async (data,thunkAPI) => {
  try {
    return await authservice.bloqueruser(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const Debloquser= createAsyncThunk("order/debloquer user", async (data,thunkAPI) => {
  try {
    return await authservice.debloqueruser(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const Getordersum= createAsyncThunk("order/sum order", async (data,thunkAPI) => {
  try {
    return await authservice.getordersum();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const Getordersnum1= createAsyncThunk("order/Getordersnum1", async (data,thunkAPI) => {
  try {
    return await authservice.getordersnum1();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const logaut = createAction("reset_all");
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.info("Bienvenue")
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;

      })
      .addCase(getordrs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getordrs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.order = action.payload;
      })
      .addCase(getordrs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(getauser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getauser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.nor_user = action.payload;
      })
      .addCase(getauser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(getuserid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getuserid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userbyid = action.payload;
        state.message = "success";
      })
      .addCase(getuserid.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.nor_user = action.payload;
      })
      .addCase(getuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(Getmonth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Getmonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Getmonthdetail = action.payload;
      })
      .addCase(Getmonth.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(Getmonth2.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Getmonth2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Getyears = action.payload;
      })
      .addCase(Getmonth2.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(Getorders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Getorders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Getorders = action.payload;
      })
      .addCase(Getorders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })


      .addCase(Getaorder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Getaorder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Getaorder = action.payload;
      })
      .addCase(Getaorder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })


      .addCase(Udateorder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Udateorder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Udateorder = action.payload;
        toast.success("Statut mis à jour avec succès");
      })
      
      .addCase(Udateorder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        toast.error = ("Status udated avec erreur")

      })



      .addCase(Bloquser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Bloquser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Bloquser = action.payload;
        toast.success("Utilisateur bloquer avec success");
      })
      
      .addCase(Bloquser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;

      })

      .addCase(Debloquser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Debloquser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Debloquser = action.payload;  
              toast.success("Utilisateur débloquer avec success");

      })
      
      .addCase(Debloquser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;

      })

      
      .addCase(Getordersum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Getordersum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Getordersum = action.payload;

      })
      
      .addCase(Getordersum.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;

      })

      .addCase(Getordersnum1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Getordersnum1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Getordersnum1 = action.payload;

      })
      
      .addCase(Getordersnum1.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;

      })

      
      .addCase(logaut, () => initialState);
  },
});
export default authSlice.reducer;
