import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { cryptosReducer } from './cryptosReducer';

export const rootReducer = combineReducers({
    auth : authReducer,
    cryptos : cryptosReducer
});