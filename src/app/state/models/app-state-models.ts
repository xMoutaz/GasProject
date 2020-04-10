import { LanguageState, SelectLangState, SelelectLanguageReducer, LanguageReducer } from 'src/app/reducers/language.reducers';

export interface AppState {
    readonly selectLang: SelectLangState,
    readonly language: LanguageState
    readonly routerReducer
}

