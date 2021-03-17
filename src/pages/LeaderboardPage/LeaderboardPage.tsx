import * as React from 'react';
import bem from 'easy-bem';
import LeaderboardItem from './components/LeaderboardItem';
import {connect} from 'react-redux';
import {IStore} from '../../store/types';
import {ILeaderData} from '../../common/types/types';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {fetchLeaderBoardData} from '../../store/leaderBoard/actions';
import {ILeaderBoard} from '../../store/leaderBoard/types';
import Meta from '../../components/Meta/Meta';

const b = bem('InnerPage');

type StateProps = {
    leaderBoard: ILeaderData[]
};

interface DispatchToProps {
    setLeaders: (leaders: {item: ILeaderData[]}) => void;
}

interface LeaderBoardProps extends DispatchToProps{
    setLeaders: () => void;
    leaderBoard: StateProps['leaderBoard'];
}

class LeaderboardPage extends React.PureComponent<LeaderBoardProps> {
    componentDidMount(): void {
        this.props.setLeaders();
    }

    render() {
        return <div className={b()}>
            <Meta title={'Leaderboard'}/>
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

const mapStateToProps = (state: IStore): StateProps => ({
    leaderBoard: state.leaderBoard.item,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<ILeaderBoard, {}, AnyAction>): DispatchToProps => ({
    setLeaders: () => dispatch(fetchLeaderBoardData())
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardPage);
