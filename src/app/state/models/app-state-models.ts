import { LanguageState, SelectLangState, SelelectLanguageReducer, LanguageReducer, UserState, PageLanguageState } from 'src/app/reducers/language.reducers';

export interface AppState {
    readonly selectLang: SelectLangState,
    readonly pageLanguage: PageLanguageState,
    readonly language: LanguageState,
    readonly User: UserState,
    readonly routerReducer
}

