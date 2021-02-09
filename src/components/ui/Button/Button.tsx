import React from 'react';
import bem from 'easy-bem';
import classnames from 'classnames';
import {IButtonProps} from './types';
import './Button.scss';

const b = bem('Button');

const Button = (props?: IButtonProps) => {
    const className = classnames(b(), props?.className, {
        [`${b()}--primary`]: props?.appearance === 'primary',
        [`${b()}--outlined`]: props?.appearance === 'outlined',
        [`${b()}--small`]: props?.size === 'small',
        [`${b()}--large`]: props?.size === 'large',
        [`${b()}--block`]: props?.block
    });

    return <button {...props} className={className}>{props?.children}</button>;
};

export default Button;
