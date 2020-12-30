import {ButtonHTMLAttributes, PropsWithChildren} from 'react';

type ButtonAperance = 'primary' | 'default' | 'outlined';

export interface IButtonProps extends PropsWithChildren<ButtonHTMLAttributes<any>> {
    aperance?: ButtonAperance;
}
