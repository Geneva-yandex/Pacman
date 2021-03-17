import React, {useEffect, useRef, useState} from 'react';
import bem from 'easy-bem';
import Game from 'components/Game';
import FullscreenButton from 'components/FullscreenButton';
import PlayStopButton from 'components/PlayStopButton';
import {useFullscreen, useSound} from 'common/hooks';
import {GamePageViewEnum} from 'common/enums/GamePageViewEnum';
import './GamePage.scss';

import {ViewType} from './types';
import Finish from './views/Finish';

const b = bem('GamePage');

const GamePage = () => {
    const gameRef = useRef(null);
    const [view, setView] = useState<ViewType>(GamePageViewEnum.Game);
    const [isFullscreen, setIsFullscreen] = useFullscreen(gameRef);

    const {play, pause, played} = useSound('sounds/game.mp3', {
        volume: 0.4,
        loop: true
    });

    useEffect(() => {
        play();
        return () => pause();
    }, []);

    const getView = () => {
        switch (view) {
        case GamePageViewEnum.Finish:
            return <Finish changeView={() => setView(GamePageViewEnum.Game)}/>;
        case GamePageViewEnum.Game:
            return <Game changeView={() => setView(GamePageViewEnum.Finish)}/>;
        }
    };

    const toggleSound = () => played ? pause() : play();

    return (
        <div ref={gameRef} className={b()}>
            <div className={'container-fluid'}>
                <div className={b('tools')}>
                    <PlayStopButton played={played} onClick={toggleSound} />
                    <FullscreenButton onClick={setIsFullscreen} isFullscreen={isFullscreen} />
                </div>

                {getView()}
            </div>
        </div>
    );
};

export default GamePage;
