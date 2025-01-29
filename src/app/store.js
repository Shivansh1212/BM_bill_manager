import { configureStore } from "@reduxjs/toolkit";
import billsReducer from '../features/bill_manager/billsSlice'

export const store= configureStore({
    reducer: billsReducer
});