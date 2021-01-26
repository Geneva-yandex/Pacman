import React from 'react';
import SVG from 'react-inlinesvg';
import FullscreenInIcon from 'public/images/icons/expand-outline.svg';
import FullscreenOutIcon from 'public/images/icons/contract-outline.svg';
import {Tooltip} from '../ui';
import './FullscreenButton.scss';

import {IFullscreenButtonProps} from './types';

const FullscreenButton = ({isFullscreen, onClick}: IFullscreenButtonProps) => {
    const icon = isFullscreen ? FullscreenOutIcon : FullscreenInIcon;
    const tooltip = isFullscreen ? 'Fullscreen Out' : 'Fullscreen In';

    return <button className="FullscreenButton" type="button" onClick={onClick}>
        <Tooltip id="fsTooltip" tooltip={tooltip} place="bottom">
            <SVG src={icon} />
        </Tooltip>
    </button>;
};

export default FullscreenButton;
