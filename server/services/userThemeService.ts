import {UserTheme} from '../db/postgres/models';
import {UserThemeCreateDto} from '../dto';

class UserThemeServiceService {
    public setUserTheme(createDto: UserThemeCreateDto): Promise<UserTheme> {
        // @ts-ignore
        return UserTheme.create(createDto);
    }

    public updateUserTheme(updateDto: UserThemeCreateDto): Promise<UserTheme> {
        // @ts-ignore
        return UserTheme.update(updateDto, {where: {ownerId: updateDto.ownerId}});
    }

    public getUserTheme(ownerId: number): Promise<UserTheme | null> {
        return UserTheme.findOne({where: {ownerId}});
    }
}

export default new UserThemeServiceService();
