import React from 'react';
import { useDispatch } from 'react-redux';

import GoogleLogin from 'react-google-login';
import { startLogin } from '../../actions/auth';

import './login.css';

export const LoginScreen = () => {
    
    const google = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    
    const dispatch = useDispatch();

                    
    const responseSuccesGoogle = ( response ) => {
        const id = response.getAuthResponse().id_token;
        dispatch( startLogin( id ));
    }

    const responseErrorGoogle = ( response ) => {
        console.log(response);
    }

    return (
        <div className="container login-container">
            <div className="row justify-content-md-center">
                <div className="col-md-3 login-form-1">
                    <GoogleLogin
                        clientId={google}
                        buttonText="Login with google"
                        onSuccess={responseSuccesGoogle}
                        onFailure={responseErrorGoogle}
                        isSignedIn={true}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

            </div>
            
        </div>
    )
}
