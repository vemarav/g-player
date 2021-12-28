import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface PayloadData {
  filename: string;
  scale: number;
  volume: number;
  brightness: number;
  playedDuration: number;
}

export interface Resume {
  [key: string]: PayloadData | undefined;
}

export const initialFileState: PayloadData = {
  filename: '',
  scale: 1,
  volume: 0,
  brightness: 0,
  playedDuration: 0,
};
const initialState: Resume = {};

const resume = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<PayloadData>) => {
      const data = action.payload;
      state[data.filename] = data;
    },
    remove: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    clear: state => {
      state = initialState;
    },
  },
});

export const {update, remove, clear} = resume.actions;

export default resume.reducer;
