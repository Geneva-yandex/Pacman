import * as React from 'react';
import {connect} from 'react-redux';
import {UserDTO as userItem} from '../../types/types';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {DispatchAdding, pendingUserType} from '../../store/user/actionTypes';
import {setUser, pendingUser} from '../../store/user/actions';
import AuthApi from 'api/AuthApi';
import OAuthApi from 'api/OAuthApi';
import {IStoreState as state} from '../../store/types';
import {getParam} from '../../utils/getParamFromUri';

type StateProps = {
    user: unknown;
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
        componentDidMount(): void {
            if (code !== null) {
                OAuthApi.signInToYandex(code)
                    .then(res => {
                        if (res.data === 'OK') {
                            AuthApi
                                .getUserInfo()
                                .then(res => {
                                    setUser(res.data);
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    });
            }

            const {onGettingUser, setUser} = this.props;
            onGettingUser();
            AuthApi
                .getUserInfo()
                .then(res => {
                    setUser(res.data);
                });
        }

        render() {
            return (
                <WrappedComponent {...this.props}/>
            );
        }
    }

    const mapDispatchToProps = (dispatch: ThunkDispatch<unknown, {}, AnyAction>): DispatchToProps => ({
        setUser: (user: userItem) => {
            dispatch(setUser(user));
        },
        onGettingUser: () => {
            dispatch(pendingUser());
        }
    });

    const mapStateToProps = (state: state): StateProps => ({
        user: state.user
    });

    return connect(mapStateToProps, mapDispatchToProps)(withUser);
}

export default withUser;
