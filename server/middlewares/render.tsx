import React from 'react';
import {NextFunction, Request} from 'express';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import {Helmet, HelmetData} from 'react-helmet';
import {StaticRouter} from 'react-router-dom';
import {StaticRouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {ResponseWithRender} from '../types';
import Bundle from '../../src/components/Bundle';
import configureStore from '../../src/store/configureStore';
import {IStore} from '../../src/store/types';
import {IUser} from '../../src/common/types/interfaces';
import {UserStatusEnum} from '../../src/store/user';

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

export default (req: Request, res: ResponseWithRender, next: NextFunction) => {
    res.renderBundle = () => {
        const {store} = configureStore({
            router: {
                initialEntries: [req.url]
            },
            initialStore: {
                user: {
                    item: res.locals.user as IUser,
                    status: UserStatusEnum.Success
                }
            } as any
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
        const html = getHTML({bundleHTML, helmet, store: store.getState() as IStore});

        res.send(html);
    };

    next();
};
