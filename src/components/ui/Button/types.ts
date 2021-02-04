import {ButtonHTMLAttributes, PropsWithChildren} from 'react';

type ButtonAppearance = 'primary' | 'default' | 'outlined';
type ButtonSize = 'small' | 'middle';

export interface IButtonProps extends PropsWithChildren<ButtonHTMLAttributes<any>> {
    aperance?: ButtonAppearance;
    size?: ButtonSize;
    block?: boolean
}
