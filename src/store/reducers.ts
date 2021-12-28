import {combineReducers} from '@reduxjs/toolkit';

import resume from './slices/resume';
import settings from './slices/settings';

const rootReducer = combineReducers({
  resume,
  settings,
});

export default rootReducer;
