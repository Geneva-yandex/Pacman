import React from 'react';
import {Provider} from 'react-redux';
import {createGlobalStyle} from 'styled-components';
import Bundle from './components/Bundle';
import ErrorBoundary from './components/ErrorBoundary';
import {ConnectedRouter} from 'connected-react-router';
import {history, store} from './store/initClientStore';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-text: white;
    --color-background: #171717;
    --color-primary: #fed940;
    --color-sidebar-bg: rgba(47, 47, 47, 0.5);
    --color-sidebar-icon: white;
    --color-input-border: rgba(#ffffff, 0.2);
    --color-input-border-focus: rgba(#ffffff, 0.4);
    --color-tabs-border: rgba(#eaeef4, 0.3);
  }
`;

/*
const lightTheme = `
  :root {
    --color-text: black; --color-background: white;
      --color-default-button-bg: #dedede;
      --color-default-button-color: #171717;
    --color-primary: hsl(245deg, 100%, 60%);
    --color-sidebar-bg: rgba(213, 213, 213, 0.8);
    --color-sidebar-icon: black;
      --color-input-border: #171717;
      --color-input-border-focus: var(--color-primary);
      --color-tabs-border: #171717;
  }
`;

const GlobalStyles = createGlobalStyle`${lightTheme}}`;
 */

export default class Application extends React.PureComponent {
    render() {
        return (
            <>
                <GlobalStyles />
                <Provider store={store}>
                    <ErrorBoundary>
                        <ConnectedRouter history={history}>
                            <Bundle/>
                        </ConnectedRouter>
                    </ErrorBoundary>
                </Provider>
            </>
        );
    }
}
