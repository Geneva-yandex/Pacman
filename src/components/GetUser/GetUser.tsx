import * as React from 'react';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {DispatchAdding, pendingUserType} from '../../store/user/actionTypes';
import {setUser, pendingUser} from '../../store/user';
import AuthApi from 'api/AuthApi';
import OAuthApi from 'api/OAuthApi';
import {IStore} from '../../store/types';
import {getParam} from '../../utils/getParamFromUri';
import {IUser} from '../../common/types/interfaces';

type StateProps = {
    user: unknown;
    state: unknown
};

type ComponentState = {
    user: {}
};

interface DispatchToProps {
    setUser: DispatchAdding['setUser'],
    onGettingUser: pendingUserType['onGettingUser']
}

function withUser(WrappedComponent: typeof React.Component) {
    const code = getParam('code');

    class withUser extends React.Component<DispatchToProps, ComponentState> {
        private getUserInfo(): void {
            const {setUser} = this.props;
            AuthApi
                .getUserInfo()
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }

        async componentDidMount(): Promise<void> {
            if (code !== null) {
                let singInToYandexResponse = await OAuthApi.signInToYandex(code);
                if (singInToYandexResponse.data === 'OK') {
                    this.getUserInfo();
                }
            } else {
                const {onGettingUser} = this.props;
                onGettingUser();
                this.getUserInfo();
            }
        }

        render() {
            return (
                <WrappedComponent {...this.props}/>
            );
        }
    }

    const mapDispatchToProps = (dispatch: ThunkDispatch<unknown, {}, AnyAction>): DispatchToProps => ({
        setUser: (user: IUser) => {
            dispatch(setUser(user));
        },
        onGettingUser: () => {
            dispatch(pendingUser());
        }
    });

    const mapStateToProps = (state: IStore): StateProps => ({
        user: state.user,
        state: state
    });

    return connect(mapStateToProps, mapDispatchToProps)(withUser);
}

export default withUser;
