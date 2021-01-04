import React, {FC} from 'react';
import bem from 'easy-bem';
import {IButtonProps} from './types';
import './Button.scss';
import classnames from 'classnames';

const b = bem('Button');

const Button: FC<IButtonProps> = (props?: IButtonProps) => {
    const className = classnames(b(), props?.className, {
        [`${b()}--primary`]: props?.aperance === 'primary',
        [`${b()}--outlined`]: props?.aperance === 'outlined',
        [`${b()}--small`]: props?.size === 'small'
    });

    return <button className={className} {...props}>{props?.children}</button>;
};

export default Button;
