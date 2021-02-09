import * as React from 'react';
import {render} from 'react-dom';
import Application from './Application';
import './index.scss';
import {isProduction} from './common/utils/env';
import axios from 'axios';
axios.defaults.withCredentials = true;

if (isProduction()) {
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

render(<Application/>, document.getElementById('root'));
