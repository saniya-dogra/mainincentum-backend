import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formOneSlice';
import formTwoReducer from './formTwoSlice'; // Corrected the import

export const store = configureStore({
  reducer: {
    form: formReducer,  
    formTwo: formTwoReducer, 
  }
});
