import {useCallback, useRef, useState} from 'react';
import {Howl, HowlOptions} from 'howler';

export default (path: string, options: HowlOptions = {}) => {
    const [played, setPlayed] = useState(false);
    const [sound, setSound] = useState<number>();
    const audio = useRef(new Howl({src: [path], ...options}));

    const pause = useCallback(() => {
        audio.current.pause(sound);
        setPlayed(false);
    }, [sound]);

    const play = useCallback(() => {
        const id = audio.current.play();
        setSound(id);
        setPlayed(true);
    }, []);

    return {
        pause,
        play,
        played
    };
};
