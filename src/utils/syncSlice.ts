import { createSlice } from "@reduxjs/toolkit";

import { Sync } from "@/type";
import { syncItems } from "./helper";

const initialState = {
  isOnline: true,
  syncStatus: "synced",
} as Sync;

const syncSlice = createSlice({
  name: "sync",
  initialState,
  reducers: {
    setConnectionStatus(state, action) {
      const { isOnline } = action.payload;
      state.isOnline = isOnline;
    },

    updateSyncStatus(state, action) {
      state.syncStatus = action.payload;
    },
    startSync() {
      syncItems();
    },
  },
});

export const { setConnectionStatus, startSync, updateSyncStatus } =
  syncSlice.actions;
export default syncSlice.reducer;
