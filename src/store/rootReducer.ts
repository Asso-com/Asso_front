import { combineReducers } from 'redux';

import authSlice from './authSlice';

const rootReducer = combineReducers({
    authSlice,
});

export default rootReducer;
