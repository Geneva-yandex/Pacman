import React from 'react';
import FullscreenInIcon from 'public/images/icons/expand-outline.svg';
import FullscreenOutIcon from 'public/images/icons/contract-outline.svg';
import IconButton from './IconButton';

interface IFullscreenButtonProps {
    isFullscreen: boolean;
    onClick: () => void;
}

const FullscreenButton = ({isFullscreen, onClick}: IFullscreenButtonProps) => {
    const icon = isFullscreen ? FullscreenOutIcon : FullscreenInIcon;
    const tooltip = isFullscreen ? 'Fullscreen Out' : 'Fullscreen In';
    return <IconButton icon={icon} tooltip={tooltip} onClick={onClick} />;
};

export default FullscreenButton;
