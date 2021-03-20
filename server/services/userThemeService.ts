import {UserTheme2} from '../db/postgres/models';
import {UserThemeCreateDto} from '../dto';

class UserThemeServiceService {
    public setUserTheme(createDto: UserThemeCreateDto): Promise<UserTheme2> {
        // @ts-ignore
        return UserTheme2.create(createDto);
    }

    public updateUserTheme(updateDto: UserThemeCreateDto): Promise<UserTheme2> {
        // @ts-ignore
        return UserTheme2.update(updateDto, {where: {ownerId: updateDto.ownerId}});
    }

    public getUserTheme(ownerId: number): Promise<UserTheme2 | null> {
        // @ts-ignore
        return UserTheme2.findOne({where: {ownerId}});
    }
}

export default new UserThemeServiceService();
