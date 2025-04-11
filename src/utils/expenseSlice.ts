import { ExpenseItem } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  addItemToLocalStorage,
  deleteItemFromLocalStorage,
  updateItemInLocalStorage,
} from "./helper";

const authState = JSON.parse(localStorage.getItem("auth") || "{}");
const items: ExpenseItem[] = JSON.parse(localStorage.getItem("items") || "[]");

const initialState = authState.email
  ? items.filter((item) => item.user === authState.email)
  : [];

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    getExpense: (_, action) => {
      const user = action.payload;

      const allItemsString = localStorage.getItem("items");
      if (!allItemsString) {
        localStorage.setItem("items", "[]");
      }
      const allItems = JSON.parse(
        localStorage.getItem("items")!
      ) as ExpenseItem[];

      return allItems.filter((item) => item.user === user);
    },
    addExpense: (
      state,
      action: PayloadAction<{
        item: ExpenseItem;
        isOnline: boolean;
      }>
    ) => {
      const { item, isOnline } = action.payload;

      const newItem = { ...item, id: uuidv4() };
      state.push(newItem);
      addItemToLocalStorage(newItem, isOnline);
    },
    updateExpense: (
      state,
      action: PayloadAction<{
        item: ExpenseItem;
        isOnline: boolean;
      }>
    ) => {
      const { item, isOnline } = action.payload;

      const idx = state.findIndex((cur) => cur.id === item.id);
      if (idx !== -1) {
        state[idx] = item;

        updateItemInLocalStorage(item, isOnline);
      }
    },
    deleteExpense: (
      state,
      action: PayloadAction<{ id: string; isOnline: boolean }>
    ) => {
      const { id, isOnline } = action.payload;

      const updatedState = state.filter((item) => item.id !== id);

      deleteItemFromLocalStorage(id, isOnline);
      return updatedState;
    },
  },
});

export const { addExpense, updateExpense, deleteExpense, getExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
