import {BaseApi} from './BaseApi';
import {SendDTOToLeaderBoard, GetDTOFromLeaderBoards} from '../common/types/types';

class LeaderBoardApi extends BaseApi {
    constructor() {
        super('leaderboard');
    }

    public sendDataToLeaderBoard(data: SendDTOToLeaderBoard) {
        return this.post('', data);
    }

    public getDataForLeaderBoard(data: GetDTOFromLeaderBoards) {
        return this.post('/all', data);
    }
}

export default new LeaderBoardApi();
