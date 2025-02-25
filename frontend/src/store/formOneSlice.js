import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createFormOne = createAsyncThunk(
    "form/createFormOne",
    async (data, { rejectWithValue }) => {
      try {
        console.log("Sending data:", data); // Log the payload
        const response = await axios.post(`${API_URL}/form-one`, data);
        console.log("Response:", response.data); // Log the response
        return response.data;
      } catch (error) {
        console.log("Error:", error.response?.data || error.message); // Log the error
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );

export const fetchFormOne = createAsyncThunk(
  "form/fetchFormOne",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/form-one`
      );
      return response.data;
    } catch (error) {
      console.log("error fetch form one data", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFormOneByID = createAsyncThunk(
    "form/fetchFormOneByID",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/form-one/${id}`
        );
        console.log("API Response:", response.data); // Log the response
        return response.data;
      } catch (error) {
        console.log("Error fetching data:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );

const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: null,
    forms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Form One
      .addCase(createFormOne.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createFormOne.fulfilled, (state, action) => {
        state.loading = false;
        state.formData = action.payload;
      })
      .addCase(createFormOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Forms
      .addCase(fetchFormOne.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormOne.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = action.payload;
      })
      .addCase(fetchFormOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Form One By ID
      .addCase(fetchFormOneByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormOneByID.fulfilled, (state, action) => {
        state.loading = false;
        state.formData = action.payload; // Ensure this is correct
      })
      .addCase(fetchFormOneByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default formSlice.reducer;
