import { types } from '../types/types';

const initState = {
    cryptosData : []
}

export const cryptosReducer = ( state = initState, action) => {
    switch (action.type) {
        case types.dataCryptoLoaded:
            return{
                ...state,
                cryptosData : action.payload
            }    
        default:
            return state;
    }
}