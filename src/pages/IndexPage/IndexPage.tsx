import * as React from 'react';
import bem from 'easy-bem';
import './IndexPage.scss';
import AuthApi from '../../utils/api/AuthApi';
import {RouteComponentProps, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {DispatchLoggingOut} from '../../store/user/actionTypes';
import {logOut} from '../../store/user/actions';
import {state as IStoreState} from '../../store/types';

type StateProps = {
    user: IStoreState['user'];
};

const b = bem('IndexPage');

type State = {
    errorMessage: string
};

interface ComponentProps extends RouteComponentProps {
    logOut: DispatchLoggingOut['logOut']
}

class IndexPage extends React.PureComponent<ComponentProps, State> {
    state = {
        errorMessage: ''
    };

    logOutFromSystem = () => {
        const {logOut} = this.props;
        AuthApi.logOut()
            .then(res => {
                if (res.status === 200) {
                    localStorage.removeItem('user');
                    logOut();
                    this.props.history.push('/login');
                }
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.response.data.reason
                });
            });
    };

    render() {
        return (
            <div className={b()}>
                <div className="container-fluid">
                    <h1>Index Page</h1>
                    <button onClick={this.logOutFromSystem}>Выйти из системы</button>
                    <p className="error">{this.state.errorMessage}</p>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<unknown, {}, AnyAction>): DispatchLoggingOut => ({
    logOut: () => {
        dispatch(logOut());
    }
});

const mapStateToProps = (state: IStoreState): StateProps => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IndexPage));
