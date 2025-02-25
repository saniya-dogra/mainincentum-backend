import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const API_URL = import.meta.env.VITE_API_URL;

export const createFormTwo = createAsyncThunk(
    "form/createFormTwo",
    async(data,{rejectWithValue})=>{
        try {
            console.log("Sending data:", data);
            const response = await axios.post(`${API_URL}/form-two`, data);
            console.log("Response:", response.data);
            return response.data;
        } catch (error) {
            console.log("Error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Something went wrong"); 
        }
    }
)


const formTwoSlice = createSlice({
    name: "formTwo",
    initialState:{
        formData:null,
        forms:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // create form two
        .addCase(createFormTwo.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(createFormTwo.fulfilled,(state,action)=>{
            state.loading = false;
            state.formData = action.payload;
        })
        .addCase(createFormTwo.rejected,(state,action)=>{
          state.loading = false;
          state.error = action.payload;
        })
    }
})