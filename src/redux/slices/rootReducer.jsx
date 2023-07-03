import { combineReducers } from '@reduxjs/toolkit';
import studentSlice from './studentSlice'
import toggleThemeSlice from './toggleThemeSlice';
const rootReducer = combineReducers({
    studentSlice,
    toggleThemeSlice
});

export default rootReducer;