import {SiteTheme} from '../db/postgres/models';
import {SiteThemeCreateDto, SiteThemeDto} from '../dto';

class ThemeService {
    public create(theme: SiteThemeCreateDto): Promise<SiteTheme> {
        // @ts-ignore
        return SiteTheme.create(theme);
    }

    public update(theme: SiteThemeDto): Promise<SiteTheme> {
        // @ts-ignore
        return SiteTheme.update(theme, {where: {id: theme.id}});
    }

    public findALL(): Promise<SiteTheme[]> {
        return SiteTheme.findAll();
    }

    public findById(id: number): Promise<SiteTheme | null> {
        return SiteTheme.findByPk(id);
    }

    public findOne(where: any): Promise<SiteTheme | null> {
        return SiteTheme.findOne({where});
    }

    public delete(id: number): Promise<any> {
        return SiteTheme.destroy({
            where: {id}
        });
    }
}

export default new ThemeService();
