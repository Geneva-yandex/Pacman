import React from 'react';
import SVG from 'react-inlinesvg';
import {Tooltip} from '../ui';
import './IconnButton.scss';

interface IIconButtonProps {
    icon: any;
    onClick: () => void;
    tooltip?: string;
}

const IconButton = (() => {
    let id = 0;

    // eslint-disable-next-line react/display-name
    return ({icon, onClick, tooltip}: IIconButtonProps) => {
        return <button className='IconButton' type='button' onClick={onClick}>
            <Tooltip id={`${id++}-icon-button`} tooltip={tooltip || ''} place='bottom'>
                <SVG src={icon} />
            </Tooltip>
        </button>;
    };
})();

export default IconButton;
