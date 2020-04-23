import { LanguageState, SelectLangState, SelelectLanguageReducer, LanguageReducer, UserState } from 'src/app/reducers/language.reducers';

export interface AppState {
    readonly selectLang: SelectLangState,
    readonly language: LanguageState,
    readonly User: UserState,
    readonly routerReducer
}

