import { Language } from '../shared/models/language';
import { selectLangActionTypes, SelectLanguagAction } from '../state/select-language.actions';
import { LanguageAction, LanguageActionTypes } from '../state/language.actions';
import * as fromRouter from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface LanguageState {
  list: string[],
  loading?: boolean,
  error?: Error
}

export const LanginitialState: LanguageState = {
  list: [],
  loading: false,
  error: undefined
}
export function LanguageReducer(
  state: LanguageState = LanginitialState, 
  action: LanguageAction) {

    switch(action.type) {
        case LanguageActionTypes.LOAD_LANGUAGES:
            return { 
              ...state,
              loading: true,
              error: null
            };
        case LanguageActionTypes.LOAD_LANGUAGES_SUCCESS:
          return {
            state,
            list: action.payload,
            loading: false
          }
        case LanguageActionTypes.LOAD_LANGUAGES_FAIL:
            return { 
              ...state,
              error: action.payload,
              loading: false
            };
        case LanguageActionTypes.ADD_LANGUAGE:
            return { 
              ...state,
              loading: true,
              error: null
            };
        case LanguageActionTypes.ADD_LANGUAGE_SUCCESS:
            return { 
              ...state,
              list: [...state.list, action.payload.language],
              loading: false
            };
        case LanguageActionTypes.ADD_LANGUAGE_FAIL:
            return { 
              ...state,
              error: action.payload,
              loading: false
            };
    default:
      return state;
    } 
}

export interface SelectLangState {
  selectedLang: Language
}
export const selectLanguageInitialState: SelectLangState = {
  selectedLang: {
    language: 'en'
  }
}
export function SelelectLanguageReducer(
  state:SelectLangState = selectLanguageInitialState, 
  action: SelectLanguagAction ) 
  {
  switch(action.type) {
        case selectLangActionTypes.SELECT_LANG:          
            return { ...state, selectedLang: action.payload };
    default:
      return state;
    }
}