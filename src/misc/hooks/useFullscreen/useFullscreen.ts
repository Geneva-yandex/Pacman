import {RefObject, useLayoutEffect, useState} from 'react';
import {doc, exitFullscreen, fullscreenElement} from './utils';

export default (elRef: RefObject<HTMLInputElement>): [boolean, () => void] => {
    const initialState = fullscreenElement() !== null;
    const [isFullscreen, setIsFullscreen] = useState<boolean>(initialState);

    const setFullscreen = () => {
        if (elRef.current === null) {
            return;
        }

        if (!isFullscreen) {
            elRef.current
                .requestFullscreen()
                .then(() => {
                    setIsFullscreen(fullscreenElement() !== null);
                })
                .catch(() => {
                    setIsFullscreen(false);
                });
        } else {
            exitFullscreen();
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

