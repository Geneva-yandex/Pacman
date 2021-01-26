import {ButtonHTMLAttributes, PropsWithChildren} from 'react';

type ButtonAppearance = 'primary' | 'default' | 'outlined';
type ButtonSize = 'small' | 'middle' | 'large';

export interface IButtonProps extends PropsWithChildren<ButtonHTMLAttributes<any>> {
    appearance?: ButtonAppearance;
    size?: ButtonSize;
}
