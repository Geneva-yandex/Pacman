import {BaseApi} from './BaseApi';

class ThemeApi extends BaseApi {
    constructor() {
        super('userThemes', 'api');
    }

    public changeUserTheme() {
        return this.post('', 1);
    }
}

export default new ThemeApi();
