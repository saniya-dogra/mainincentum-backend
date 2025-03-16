import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Save Personal Details
export const savePersonalDetails = createAsyncThunk(
  "form/savePersonalDetails",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Sending data to /form/personal-details:", data);
      const response = await axios.post(`${API_URL}/form/personal-details`, data);
      console.log("Response from savePersonalDetails:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error in savePersonalDetails:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Save Loan Application
export const saveLoanApplication = createAsyncThunk(
  "form/saveLoanApplication", // Changed name to match others
  async (data, { rejectWithValue }) => {
    try {
      console.log("Sending data to /form/loan-application:", data);
      const response = await axios.post(`${API_URL}/form/loan-application`, data, {
        withCredentials: true,
      });
      console.log("Response from saveLoanApplication:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in saveLoanApplication:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Upload Loan Documents
export const uploadLoanDocuments = createAsyncThunk(
  "form/uploadLoanDocuments",
  async ({ userId, applicantIndex, files }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("applicantIndex", applicantIndex);

      Object.entries(files).forEach(([fieldName, file]) => {
        if (file) {
          formData.append(fieldName, file);
        }
      });

      console.log("Sending data to /form/loan-documents with userId:", userId);
      const response = await axios.post(`${API_URL}/form/loan-documents`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log("Response from uploadLoanDocuments:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in uploadLoanDocuments:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: "An error occurred during upload" });
    }
  }
);

// Fetch All Forms
export const fetchAllForms = createAsyncThunk(
  "form/fetchAllForms",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching all forms from /forms");
      const response = await axios.get(`${API_URL}/form/`);
      console.log("Response from fetchAllForms:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in fetchAllForms:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to fetch forms");
    }
  }
);

// Fetch Form by ID
export const fetchFormById = createAsyncThunk(
  "form/fetchFormById",
  async (id, { rejectWithValue }) => {
    try {
      console.log(`Fetching form from ${API_URL}/form/${id}`);
      const response = await axios.get(`${API_URL}/form/${id}`);
      console.log("Response from fetchFormById:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in fetchFormById:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to fetch form");
    }
  }
);

export const fetchFormsByUserId = createAsyncThunk(
  "form/fetchFormsByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      console.log(`Fetching forms for user ID from ${API_URL}/form/user/${userId}`);
      const response = await axios.get(`${API_URL}/form/user/${userId}`);
      console.log("Response from fetchFormsByUserId:", response.data);
      return response.data;
    } catch (error) {
      const errorDetails = error.response
        ? { status: error.response.status, data: error.response.data }
        : { message: error.message };
      console.error("Error in fetchFormsByUserId:", errorDetails);
      return rejectWithValue(errorDetails);
    }
  }
);

// Update Form
export const updateForm = createAsyncThunk(
  "form/updateForm",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log(`Sending update request to /forms/${id}:`, data);
      const response = await axios.put(`${API_URL}/form/${id}`, data);
      console.log("Response from updateForm:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in updateForm:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to update form");
    }
  }
);

// Update Form Status
export const updateFormStatus = createAsyncThunk(
  "form/updateFormStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      console.log(`Sending PATCH request to ${API_URL}/form/${id}/status with status:`, status);
      const response = await axios.patch(`${API_URL}/form/${id}/status`, { status }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response from updateFormStatus:", response.data);
      return response.data;
    } catch (error) {
      const errorDetails = error.response
        ? { status: error.response.status, data: error.response.data }
        : { message: error.message };
      console.error("Error in updateFormStatus:", errorDetails);
      return rejectWithValue(errorDetails);
    }
  }
);
// Delete Form
export const deleteForm = createAsyncThunk(
  "form/deleteForm",
  async (id, { rejectWithValue }) => {
    try {
      console.log(`Sending DELETE request to ${API_URL}/form/${id}`);
      const response = await axios.delete(`${API_URL}/form/${id}`);
      console.log("Response from deleteForm:", response.data);
      return response.data; // Assuming backend returns { success: true, message: "Form deleted" }
    } catch (error) {
      const errorDetails = error.response
        ? { status: error.response.status, data: error.response.data }
        : { message: error.message, code: error.code };
      console.error("Error in deleteForm:", errorDetails);
      return rejectWithValue(errorDetails);
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState: {
    userId: null,
    formData: null,
    forms: [],
    currentForm: null,
    loading: false,
    error: null,
    success: false,
    documents: null,
    total: 0,
  },
  reducers: {
    resetUploadState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.formData = null;
      state.documents = null;
      state.currentForm = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Existing cases remain unchanged...
      // Save Personal Details
      .addCase(savePersonalDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(savePersonalDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.formData = action.payload.data;
        state.userId = action.payload.data?.user || state.userId;
      })
      .addCase(savePersonalDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Save Loan Application
      .addCase(saveLoanApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(saveLoanApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.formData = action.payload.data;
        state.userId = action.payload.data?.user || state.userId;
      })
      .addCase(saveLoanApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Upload Loan Documents
      .addCase(uploadLoanDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadLoanDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.documents = action.payload.data?.loanDocuments;
        state.formData = action.payload.data;
        state.userId = action.payload.data?.user || state.userId;
      })
      .addCase(uploadLoanDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Fetch All Forms
      .addCase(fetchAllForms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllForms.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = action.payload.data;
        state.total = action.payload.total || action.payload.data.length;
      })
      .addCase(fetchAllForms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.forms = [];
        state.total = 0;
      })
      // Fetch Form by ID
      .addCase(fetchFormById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentForm = action.payload.data;
      })
      .addCase(fetchFormById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentForm = null;
      })
      // Update Form
      .addCase(updateForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.formData = action.payload.data;
        state.currentForm = action.payload.data;
        state.forms = state.forms.map((form) =>
          form._id === action.payload.data._id ? action.payload.data : form
        );
      })
      .addCase(updateForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Update Form Status
      .addCase(updateFormStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateFormStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.formData = action.payload.data;
        state.currentForm = action.payload.data;
        state.forms = state.forms.map((form) =>
          form._id === action.payload.data._id ? action.payload.data : form
        );
      })
      .addCase(updateFormStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Delete Form
      .addCase(deleteForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteForm.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = state.forms.filter((form) => form._id !== action.meta.arg);
        state.currentForm = null;
        state.total = state.forms.length;
      })
      .addCase(deleteForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Forms by User ID (New Case)
      .addCase(fetchFormsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = action.payload.data; // Store user's forms in forms array
        state.total = action.payload.data.length;
      })
      .addCase(fetchFormsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.forms = [];
        state.total = 0;
      });
  },
});
export const { resetUploadState } = formSlice.actions; // Export resetUploadState
export default formSlice.reducer;