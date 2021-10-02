import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = ( id_token ) => {
    return async( dispatch ) => {

        console.log({id_token});
        const resp = await fetchWithoutToken( 'auth/login', { id_token }, 'POST' );
        const body = await resp.json();

        if( resp.status === 200 ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.user._id,
                name: body.user.name
            }))
        } else {
            console.log(resp);
            // Swal.fire('Error', body.msg, 'error');
        }
    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchWithToken( 'auth/renew' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.user._id,
                name: body.user.name
            }) )
        } else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () => ({ type : types.authLogout })
