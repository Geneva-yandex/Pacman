import {ButtonHTMLAttributes, PropsWithChildren} from 'react';

type ButtonAperance = 'primary' | 'default' | 'outlined';
type ButtonSize = 'small' | 'middle';

export interface IButtonProps extends PropsWithChildren<ButtonHTMLAttributes<any>> {
    aperance?: ButtonAperance;
    size?: ButtonSize;
    block?: boolean
}
