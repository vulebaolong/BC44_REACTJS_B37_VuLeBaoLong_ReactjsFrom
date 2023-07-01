import { combineReducers } from '@reduxjs/toolkit';
import studentSlice from './studentSlice'
const rootReducer = combineReducers({
    studentSlice
});

export default rootReducer;