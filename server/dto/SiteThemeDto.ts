import {BaseId} from './BaseId';

export interface SiteThemeCreateDto {
    name: string;
    theme: string;
}

export interface SiteThemeDto extends BaseId {
    name: string;
    theme: string;
}
