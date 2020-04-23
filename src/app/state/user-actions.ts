import { Action } from '@ngrx/store';
import { Language } from '../shared/models/language';

export enum UserActionsTypes {
    SETCURRENTUSER="SETCURRENTUSER",
}

export class SelectCurrentUser implements Action {
    type = UserActionsTypes.SETCURRENTUSER;
    constructor(public payload: any) {}
}

export type UserActions = SelectCurrentUser;