import { getData } from '../helpers/crypto';
import { types } from '../types/types';
// import { fetchConToken } from '../helpers/fetch';

export const cryptoStartLoading = ( cryptos = [] ) => {
    return async( dispatch) => {
        let arr_crypto = [];
        
        try {
            setInterval(async() =>{
                arr_crypto=[];
                for (const crypto of cryptos ) {
                    arr_crypto.push( await getData(crypto));
                }
                dispatch(cryptosLoaded(arr_crypto));
            },1000)
            // console.log(arr_crypto);
        } catch (error) {
            console.log(error);
        }
            

    }
}

const cryptosLoaded = ( cryptos ) => ({ 
    type: types.dataCryptoLoaded,
    payload : cryptos
});