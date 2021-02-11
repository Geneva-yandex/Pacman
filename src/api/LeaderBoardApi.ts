import {BaseApi} from './BaseApi';
import {sendDTOToLeaderBoard, getDTOFromLeaderBoards} from "../types/types";

class LeaderBoardApi extends BaseApi {
    constructor() {
        super('leaderboard');
    }

    public sendDataToLeaderBoard (data : sendDTOToLeaderBoard) {
        return this.post('', data);
    }

    public getDataForLeaderBoard(data: getDTOFromLeaderBoards) {
        return this.post('/all', data)
    }


}

export default new LeaderBoardApi();
