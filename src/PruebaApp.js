import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRouter } from './router/AppRouter'
import { LoginScreen } from './components/auth/LoginScreen';

export const PruebaApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
            {/* <LoginScreen /> */}
        </Provider>
    )
}
