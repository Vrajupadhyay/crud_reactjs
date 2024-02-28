import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";

export const getStudent = createAsyncThunk("student/getStudent", async () => {
  try {
    const response = await axiosInstance.get("/");
    if (response.data.status === "success") {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const addStudent = createAsyncThunk(
  "student/addStudent",
  async (studentData) => {
    try {
      const response = await axiosInstance.post("/", studentData);
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  'student/updateStudent',
  async ({ id, data }) => {
    try {
      const response = await axiosInstance.put(`/${id}`, data);
      if (response.data.status === 'success') {
        return { id, data }; // Return both id and updated data
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id) => {
    try {
      const response = await axiosInstance.delete(`/${id}`);
      if (response.data.status === "success") {
        return id;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getStudentById = createAsyncThunk(
  "student/getStudentById",
  async (id) => {
    try {
      const response = await axiosInstance.get(`/${id}`);
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    data: [], // Ensure that data is initialized as an array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      builder
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const { id, data: updatedData } = action.payload;
        const index = state.data.findIndex((student) => student.id === id);
        if (index !== -1) {
          state.data[index] = updatedData; // Update the data at the found index
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (student) => student.id !== action.payload
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
