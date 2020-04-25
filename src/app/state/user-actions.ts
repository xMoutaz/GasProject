import { Action } from '@ngrx/store';
import { Language } from '../shared/models/language';

export enum UserActionsTypes {
    SETCURRENTUSER="SETCURRENTUSER",
}

export class SelectCurrentUserInfo implements Action {
    type = UserActionsTypes.SETCURRENTUSER;
    constructor(public payload: any) {}
}

export type UserActions = SelectCurrentUserInfo;