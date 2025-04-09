import { ExpenseItem } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const authState = JSON.parse(localStorage.getItem("auth") || "{}");
const items: ExpenseItem[] = JSON.parse(localStorage.getItem("items") || "[]");

const initialState = authState.email
  ? items.filter((item) => item.user === authState.email)
  : [];

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseItem>) => {
      const newItem = { ...action.payload, id: uuidv4() };
      state.push(newItem);

      let allItemsString = localStorage.getItem("items");
      if (!allItemsString) {
        localStorage.setItem("items", "[]");
      }
      const allItems = JSON.parse(
        localStorage.getItem("items")!
      ) as ExpenseItem[];
      allItems.push(newItem);

      localStorage.setItem("items", JSON.stringify(allItems));
    },
    updateExpense: (state, action: PayloadAction<ExpenseItem>) => {
      const idx = state.findIndex((item) => item.id === action.payload.id);
      if (idx !== -1) {
        state[idx] = action.payload;

        let allItemsString = localStorage.getItem("items");
        if (!allItemsString) {
          throw new Error("Error updating expense");
        }
        let allItems = JSON.parse(
          localStorage.getItem("items")!
        ) as ExpenseItem[];

        allItems = allItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );

        localStorage.setItem("items", JSON.stringify(allItems));
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      const idToDelete = action.payload;

      const updatedState = state.filter((item) => item.id !== idToDelete);

      const allItemsString = localStorage.getItem("items");
      if (!allItemsString) {
        throw new Error("No data found in localStorage");
      }

      const allItems = JSON.parse(allItemsString) as ExpenseItem[];
      const updatedItems = allItems.filter((item) => item.id !== idToDelete);
      localStorage.setItem("items", JSON.stringify(updatedItems));

      return updatedState;
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
