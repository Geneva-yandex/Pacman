import {ButtonHTMLAttributes, PropsWithChildren} from 'react';

type ButtonAperance = 'primary' | 'default' | 'outlined' | 'block';
type ButtonSize = 'small' | 'middle';

export interface IButtonProps extends PropsWithChildren<ButtonHTMLAttributes<any>> {
    aperance?: ButtonAperance;
    size?: ButtonSize;
}
