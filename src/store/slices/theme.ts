import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';
import type {RootState} from '../index';

const initialState = {
  mode: Appearance.getColorScheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    lightTheme: state => {
      state.mode = 'light';
    },
    darkTheme: state => {
      state.mode = 'dark';
    },
    systemTheme: state => {
      state.mode = null;
    },
  },
});

export const {lightTheme, darkTheme, systemTheme} = themeSlice.actions;

export default themeSlice.reducer;
