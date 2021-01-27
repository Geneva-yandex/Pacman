import * as React from 'react';
import {connect} from 'react-redux';
import {UserDTO as userItem} from '../../types/types';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {DispatchAdding, pendingUserType} from '../../store/user/actionTypes';
import {setUser, pendingUser} from '../../store/user/actions';
import AuthApi from '../../utils/api/AuthApi';
import {IStoreState as state} from '../../store/types';

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
    class withUser extends React.Component<DispatchToProps, ComponentState> {
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
