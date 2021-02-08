import ProfilePage from './ProfilePage';
import {ThunkDispatch} from 'redux-thunk';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Action, compose} from 'redux';

import {IUserState, UserStateActions} from '../../store/user';
import {IPasswordsDto, IUser} from 'common/types/interfaces';
import {IStoreState} from 'store/types';

const mapStateToProps = (state: IStoreState) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IUserState, void, Action>) => ({
    updateUser: (user: IUser) => dispatch(UserStateActions.updateUser(user)),
    updateAvatar: (avatar: File) => dispatch(UserStateActions.updateAvatar(avatar)),
    changePassword: (passwords: IPasswordsDto) => dispatch(UserStateActions.changePassword(passwords))
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ProfilePage);
