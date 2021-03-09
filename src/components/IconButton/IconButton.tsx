import React from 'react';
import SVG from 'react-inlinesvg';
import {Tooltip} from '../ui';
import './IconnButton.scss';

interface IIconButtonProps {
    icon: any;
    onClick: () => void;
    tooltip?: string;
}

const IconButtonWrap = (() => {
    let id = 0;

    function IconButton({icon, onClick, tooltip}: IIconButtonProps) {
        return <button className='IconButton' type='button' onClick={onClick}>
            <Tooltip id={`${id++}-icon-button`} tooltip={tooltip || ''} place='bottom'>
                <SVG src={icon} />
            </Tooltip>
        </button>;
    }

    return IconButton;
})();

export default IconButtonWrap;
