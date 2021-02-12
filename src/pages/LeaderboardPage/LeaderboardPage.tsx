import * as React from 'react';
import bem from 'easy-bem';
import LeaderboardItem from './components/LeaderboardItem';
import LeaderBoardApi from '../../api/LeaderBoardApi';
import {connect} from 'react-redux';
import {IStoreState as state} from '../../store/types';
import {ILeaderData} from '../../types/types';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {setLeaders} from '../../store/leaderBoard/actions';

const b = bem('InnerPage');

type StateProps = {
    leaderBoard: ILeaderData[]
};

interface DispatchToProps {
    setLeaders: (leaders: {item: ILeaderData[]}) => void;
}

interface LeaderBoardProps extends DispatchToProps{
    setLeaders: (leaders: {item: ILeaderData[]}) => void;
    leaderBoard: StateProps['leaderBoard'];
}

class LeaderboardPage extends React.PureComponent<LeaderBoardProps> {
    componentDidMount(): void {
        LeaderBoardApi.getDataForLeaderBoard({
            ratingFieldName: 'GenevaPacmanScore',
            cursor: 0,
            limit: 10
        })
            .then(res => {
                this.props.setLeaders({item: res.data as ILeaderData[]});
                console.log(this.props.leaderBoard);
            });
    }

    render() {
        return <div className={b()}>
            <header className={b('header')}>
                <h1>Leaderboard</h1>
            </header>

            <div className={b('main')}>
                {
                    this.props.leaderBoard.map((leader, index) => <LeaderboardItem key={leader.data.user.id} user={leader.data.user} position={index}
                        rank={leader.data.GenevaPacmanScore}/>)
                }
            </div>

        </div>;
    }
}
const mapStateToProps = (state: state): StateProps => ({
    leaderBoard: state.leaderBoard.item
});

const mapDispatchToProps = (dispatch: ThunkDispatch<unknown, {}, AnyAction>): DispatchToProps => ({
    setLeaders: (leaders: {item: ILeaderData[]}) => {
        dispatch(setLeaders(leaders));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardPage);
