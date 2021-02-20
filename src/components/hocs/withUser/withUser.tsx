import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import AuthApi from 'api/AuthApi';
import {IUser} from 'common/types/interfaces';
import {setUser, pendingUser, logOut} from 'store/user/actions';
import {IStore as state} from 'store/types';
import {ComponentState, DispatchToUserProps, StateProps} from './types';

function withUser(WrappedComponent: typeof Component) {
    class withUser extends Component<DispatchToUserProps, ComponentState> {
        componentDidMount(): void {
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

    const mapDispatchToProps = (dispatch: ThunkDispatch<unknown, {}, AnyAction>): DispatchToUserProps => ({
        setUser: (user: IUser) => dispatch(setUser(user)),
        onGettingUser: () => dispatch(pendingUser()),
        logOut: () => dispatch(logOut())
    });

    const mapStateToProps = (state: state): StateProps => ({
        user: state.user
    });

    return connect(mapStateToProps, mapDispatchToProps)(withUser);
}

export default withUser;
