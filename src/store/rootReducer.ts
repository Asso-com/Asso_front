import { combineReducers } from 'redux';

import authSlice from './authSlice';
import toastSlice from './toastSlice';
import menuSlice from './menuSlice';

const rootReducer = combineReducers({
    authSlice,
    toastSlice,
    menuSlice
});

export default rootReducer;
