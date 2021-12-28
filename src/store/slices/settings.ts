import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColorSchemeName} from 'react-native';

interface Settings {
  theme: ColorSchemeName;
  playback: 'start' | 'resume';
  loop: boolean;
}

const initialState: Settings = {
  theme: null,
  playback: 'start',
  loop: false,
};

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ColorSchemeName>) => {
      state.theme = action.payload;
    },
    setPlayBack: (state, action: PayloadAction<'start' | 'resume'>) => {
      state.playback = action.payload;
    },
    setLoop: (state, action: PayloadAction<boolean>) => {
      state.loop = action.payload;
    },
  },
});

export const {setTheme, setPlayBack, setLoop} = settings.actions;

export default settings.reducer;
