import {BaseApi} from './BaseApi';

class ThemeApi extends BaseApi {
    constructor() {
        super('userThemes', 'api');
    }

    public changeUserTheme(theme: string) {
        return this.post('', {theme});
    }
}

export default new ThemeApi();
