import * as React from 'react';
import {hydrate} from 'react-dom';
import Application from './Application';
import './index.scss';
import axios from 'axios';
import isProduction from 'common/utils/isProduction';
axios.defaults.withCredentials = true;

if (isProduction) {
    const startServiceWorker = () => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registration succeeded. Scope is ' + registration.scope);
                    })
                    .catch(error => {
                        console.log('ServiceWorker registration failed with ' + error);
                    });
            });
        }
    };

    startServiceWorker();
}

hydrate(<Application/>, document.getElementById('root'));
