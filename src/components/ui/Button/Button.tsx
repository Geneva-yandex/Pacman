import React from 'react';
import bem from 'easy-bem';
import classnames from 'classnames';
import {IButtonProps} from './types';
import './Button.scss';

const b = bem('Button');

const Button = (props?: IButtonProps) => {
    const className = classnames(b(), props?.className, {
        [`${b()}--primary`]: props?.aperance === 'primary',
        [`${b()}--outlined`]: props?.aperance === 'outlined',
        [`${b()}--small`]: props?.size === 'small',
        [`${b()}--block`]: props?.block
    });

    return <button className={className} {...props}>{props?.children}</button>;
};

export default Button;
