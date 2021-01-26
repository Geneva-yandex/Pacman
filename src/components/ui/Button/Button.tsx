import React from 'react';
import bem from 'easy-bem';
import {IButtonProps} from './types';
import './Button.scss';
import classnames from 'classnames';

const b = bem('Button');

const Button = (props?: IButtonProps) => {
    const className = classnames(b(), props?.className, {
        [`${b()}--primary`]: props?.appearance === 'primary',
        [`${b()}--outlined`]: props?.appearance === 'outlined',
        [`${b()}--small`]: props?.size === 'small',
        [`${b()}--large`]: props?.size === 'large'
    });

    return <button {...props} className={className}>{props?.children}</button>;
};

export default Button;
