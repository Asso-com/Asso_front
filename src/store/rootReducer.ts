import { combineReducers } from 'redux';

import authSlice from './authSlice';
import toastSlice from './toastSlice';

const rootReducer = combineReducers({
    authSlice,
    toastSlice,
});

export default rootReducer;
