declare module 'easy-bem';

declare module '*.jpg' {
    const value: any;
    export default value;
}

declare module '*.png' {
    const value: any;
    export default value;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare var NODE_ENV: 'production' | 'development';

declare var __PRELOADED_STATE__: any;

declare namespace Express {
    interface Request {
        /** Logger instance associated with current request */
        logger: () => void;
    }

    interface Response {

        /**
         * Renders bundle to html, then sends it
         * or performs redirect if necessary
         */
        // tslint:disable-next-line:no-any
        renderBundle(bundleName: string, data?: any): void;
    }
}
