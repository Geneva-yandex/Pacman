import React from 'react';
import bem from 'easy-bem';
import './Avatar.scss';

interface IAvatarProps {
    src: string;
    size?: number;
}

const b = bem('Avatar');

const Avatar = ({src, size = 48}: IAvatarProps) => {
    const style = {
        backgroundImage: `url(${src})`,
        width: `${size}px`,
        height: `${size}px`
    };

    return <div className={b()} style={style}/>;
};

export default Avatar;
