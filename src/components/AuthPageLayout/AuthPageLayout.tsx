import React, {PropsWithChildren} from 'react';
import bem from 'easy-bem';
import './AuthPageLayout.scss';

const b = bem('AuthPageLayout');

interface IAuthPageLayoutProps extends PropsWithChildren<any> {
    title: string;
    backLink: JSX.Element;
}

const AuthPageLayout = ({title, children, backLink}: IAuthPageLayoutProps) => {
    return (
        <div className={b()}>
            <h1 className={b('title')}>{title}</h1>
            <div className={b('form')}>{children}</div>
            <div className={b('back-link')}>{backLink}</div>
        </div>
    );
};

export default AuthPageLayout;
