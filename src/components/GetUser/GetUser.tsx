import * as React from 'react';
import {connect} from 'react-redux';
import AuthApi from 'api/AuthApi';
import {IStore as state} from '../../store/types';
import {boundActions} from '../../store/initClientStore';

interface IProps {
    user: any
}

function withUser(WrappedComponent: typeof React.Component) {
    class withUser extends React.Component<IProps> {
        componentDidMount(): void {
            boundActions.user.pendingUser();

            AuthApi
                .getUserInfo()
                .then(res => {
                    boundActions.user.setUser(res.data);
                });
        }

        render() {
            return (
                <WrappedComponent {...this.props}/>
            );
        }
    }

    const mapStateToProps = (state: state) => ({
        user: state.user
    });

    return connect(mapStateToProps)(withUser);
}

export default withUser;
