import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import checkForAuth from '../utils/checkForAuthOrRedirect';

// @ts-ignore
export default function PrivateRoute({children, ...rest}) {
    let isAuth = false;

    checkForAuth()
        .then(() => {
            isAuth = true;
        });

    return (
        <Route
            {...rest}
            render={() =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login'
                        }}
                    />
                )
            }
        />
    );
}
