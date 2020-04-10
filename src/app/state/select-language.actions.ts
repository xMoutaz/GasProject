import { Action } from '@ngrx/store';
import { Language } from '../shared/models/language';

export enum selectLangActionTypes {
    SELECT_LANG = 'SELECT_LANG'
}

export class SelectLanguage implements Action {
    type = selectLangActionTypes.SELECT_LANG;
    constructor(public payload: any) {}
}

export type SelectLanguagAction = SelectLanguage;