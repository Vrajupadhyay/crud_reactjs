import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helper/axiosInstance";
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data:
    localStorage.getItem("data") !== "undefined"
      ? JSON.parse(localStorage.getItem("data"))
      : {},
};

export const createAccount = createAsyncThunk("auth/sigup", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/SignUp.php", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/Login.php", data);
    // console.log("this is login", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axiosInstance.get("/auth/Logout.php");
    if (response.data.status === "success") {
      toast.success(response.data.message);
      return response.data;
    } else {
      toast.error(response.data.message);
      return response.data;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const getData = createAsyncThunk("auth/getData", async () => {
  try {
    const response = await axiosInstance.get("/auth/getData");
    toast.promise(response, {
      loading: "Wait! fetching data...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to fetch data",
    });
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        // console.log("Action Payload:", action.payload.data?.role);
        state.isLoggedIn = true;
        state.role = action.payload.data?.role;
        state.data = action.payload.data;
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.data?.role);
        localStorage.setItem("data", JSON.stringify(action.payload.data));
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        localStorage.removeItem("data");
      })
      .addCase(getData.fulfilled, (state, action) => {
        if (!action?.payload?.data) return;
        localStorage.setItem("data", JSON.stringify(action.payload.data));
        localStorage.setItem("role", action?.payload?.data?.role);
        localStorage.setItem("isLoggedIn", true);
        state.role = action.payload.data.role;
        state.data = action.payload.data;
        state.isLoggedIn = true;
      });
  },
});

export default authSlice.reducer;
