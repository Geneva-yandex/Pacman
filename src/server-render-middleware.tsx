import {Request, Response} from 'express';
import Bundle from './components/Bundle';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import React from 'react';
import {Helmet, HelmetData} from 'react-helmet';
import {StaticRouter} from 'react-router-dom';
import {StaticRouterContext} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {IStore} from './store/types';

interface IParamsHTML {
    bundleHTML: string,
    helmet: HelmetData,
    store: IStore
}

const getHTML = ({bundleHTML, helmet, store}: IParamsHTML) => {
    const html = renderToStaticMarkup(
        <html>
            <head>
                {helmet.title.toComponent()}
                {helmet.meta.toComponent()}
                <link href='/index.css' rel='stylesheet'/>
            </head>
            <body>
                <div id='root' dangerouslySetInnerHTML={{__html: bundleHTML}}/>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(store)}`
                    }}
                />
                <script src={'/bundle.js'}/>
            </body>
        </html>
    );

    return `<!doctype html>${html}`;
};

export default (req: Request, res: Response) => {
    const {store} = configureStore({
        router: {
            initialEntries: [req.url]
        }
    });

    const context: StaticRouterContext = {};

    const bundleHTML = renderToString(
        <Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}
            >
                <Bundle/>
            </StaticRouter>
        </Provider>
    );

    if (context.url) {
        res.redirect(context.url);
        return;
    }

    const helmet = Helmet.rewind();

    res.send(getHTML({bundleHTML, helmet, store: store.getState() as IStore}));
};
