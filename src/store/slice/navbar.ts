import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'mode',
  initialState: {
    activeTab: 1,
    isOpen: false,
  },
  reducers: {
    changeActiveTab: (state, value) => {
      state.activeTab = value.payload;
    },
    changeOpen: (state, value) => {
      state.isOpen = value.payload;
    },
  },
});

export const { changeActiveTab, changeOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;