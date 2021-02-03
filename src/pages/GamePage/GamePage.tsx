import React, {useRef, useState} from 'react';
import bem from 'easy-bem';
import './GamePage.scss';
import Game from 'components/Game';
import FullscreenButton from 'components/FullscreenButton';
import {useFullscreen} from 'misc/hooks';
import {ViewType} from './types';
import {GamePageViewEnum} from '../../enums/GamePageViewEnum';
import Start from './views/Start';
import Finish from './views/Finish';

const b = bem('GamePage');

const GamePage = () => {
    const gameRef = useRef(null);
    const [view, setView] = useState<ViewType>(GamePageViewEnum.Start);
    const [isFullscreen, setIsFullscreen] = useFullscreen(gameRef);

    const getView = () => {
        switch (view) {
        case GamePageViewEnum.Start:
            return <Start changeView={() => setView(GamePageViewEnum.Game)}/>;
        case GamePageViewEnum.Finish:
            return <Finish changeView={() => setView(GamePageViewEnum.Game)}/>;
        case GamePageViewEnum.Game:
            return <Game changeView={() => setView(GamePageViewEnum.Finish)}/>;
        }
    };

    return (
        <div ref={gameRef} className={b()}>
            <div className={'container-fluid'}>
                <FullscreenButton onClick={setIsFullscreen} isFullscreen={isFullscreen} />
                {getView()}
            </div>
        </div>
    );
};

export default GamePage;
