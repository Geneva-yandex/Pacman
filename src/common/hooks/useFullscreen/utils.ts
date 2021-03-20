import isServer from '../../utils/isServer';

interface ILocalDocument extends HTMLDocument {
    webkitFullscreenElement?: Element;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    msExitFullscreen?: () => void;
    mozCancelFullScreen?: () => void;
    webkitExitFullscreen?: () => void;
}

export const doc = !isServer ? document as ILocalDocument : null;

export function fullscreenElement(): Element | null | undefined {
    if (!doc) {
        return;
    }

    // @ts-ignore
    return doc[getBrowserFullscreenElementProp()];
}

export function exitFullscreen(): void {
    if (!doc) {
        return;
    }

    if (doc.exitFullscreen) {
        doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
    } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
    }
}

export function getBrowserFullscreenElementProp(): string | never | undefined {
    if (!doc) {
        return;
    }

    if (typeof doc.fullscreenElement !== 'undefined') {
        return 'fullscreenElement';
    }

    if (typeof doc.mozFullScreenElement !== 'undefined') {
        return 'mozFullScreenElement';
    }

    if (typeof doc.msFullscreenElement !== 'undefined') {
        return 'msFullscreenElement';
    }

    if (typeof doc.webkitFullscreenElement !== 'undefined') {
        return 'webkitFullscreenElement';
    }

    throw new Error('fullscreenElement is not supported by this browser');
}
