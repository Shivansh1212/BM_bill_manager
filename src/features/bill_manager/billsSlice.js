import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  bills: [
    {
      id: 1,
      text: "430",
      description: "Dominoes",
      category: "Food & dining",
      date: "01-02-2020",
    },
    {
      id: 2,
      text: "500",
      description: "Car wash",
      category: "Utility",
      date: "01-06-2020",
    },
    {
      id: 3,
      text: "2030",
      description: "Amazon",
      category: "Shopping",
      date: "01-07-2020",
    },
    {
      id: 4,
      text: "35900",
      description: "House Rent",
      category: "Food & dining",
      date: "01-03-2020",
    },
    {
      id: 5,
      text: "2200",
      description: "Tuition",
      category: "Education",
      date: "01-12-2020",
    },
    {
      id: 6,
      text: "320",
      description: "Laundry",
      category: "Personal care",
      date: "01-14-2020",
    },
    {
      id: 7,
      text: "3430",
      description: "Vacation",
      category: "Personal care",
      date: "01-18-2020",
    },
  ],
};

export const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      const { text, description, category, date } = action.payload;
      const bill = {
        id: nanoid(),
        text,
        description,
        category,
        date,
      };
      state.bills.push(bill);
    },
    removeBill: (state, action) => {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload);
    },
    editBill: (state, action) => {
      const { id, text, description, category, date } = action.payload;
      const bill = state.bills.find((bill) => bill.id === id);
      if (bill) {
        if (text !== undefined) bill.text = text;
        if (description !== undefined) bill.description = description;
        if (category !== undefined) bill.category = category;
        if (date !== undefined) bill.date = date;
      }
    },
  },
});

export const { addBill, removeBill, editBill } = billsSlice.actions;

export default billsSlice.reducer;
