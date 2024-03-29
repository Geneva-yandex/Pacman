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
