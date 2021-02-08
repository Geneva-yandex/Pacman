import React from 'react';
import PlayIcon from 'public/images/icons/play-outline.svg';
import PauseIcon from 'public/images/icons/pause-outline.svg';
import IconButton from './IconButton';

interface IPlayStopButtonProps {
    played: boolean;
    onClick: () => void;
}

const PlayStopButton = ({played, onClick}: IPlayStopButtonProps) => {
    const icon = played ? PauseIcon : PlayIcon;
    const tooltip = played ? 'Pause' : 'Play';
    return <IconButton icon={icon} tooltip={tooltip} onClick={onClick} />;
};

export default PlayStopButton;
