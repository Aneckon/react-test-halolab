import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchCard = createAsyncThunk('card/fetchCard', async () => {
  const response = await axios.get('https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e');
  return response.data;
});

interface CardState {
  cardModal: any;
  cardBuy: any;
}

const initialState = { cardModal: null, cardBuy: [] } as unknown as CardState;

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addModal: (state, action: PayloadAction<any>) => {
      state.cardModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      state.cardBuy = action.payload;
    });
  },
});

export const { addModal } = cardSlice.actions;
export default cardSlice.reducer;
