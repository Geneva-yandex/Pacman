import {RefObject, useLayoutEffect, useState} from 'react';
import {doc, exitFullscreen, fullscreenElement} from './utils';

export default (elRef: RefObject<HTMLInputElement>): [boolean, () => void] => {
    const initialState = fullscreenElement() !== null;
    const [isFullscreen, setIsFullscreen] = useState<boolean>(initialState);

    const setFullscreen = async () => {
        if (elRef.current === null) {
            return;
        }

        if (isFullscreen) {
            exitFullscreen();
        } else {
            try {
                await elRef.current.requestFullscreen();
                setIsFullscreen(fullscreenElement() !== null);
            } catch (e) {
                setIsFullscreen(false);
            }
        }
    };

    useLayoutEffect(() => {
        doc.onfullscreenchange = () =>
            setIsFullscreen(fullscreenElement() !== null);

        return () => {
            doc.onfullscreenchange = null;
        };
    });

    return [isFullscreen, setFullscreen];
};

