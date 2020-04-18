import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  private dbUsers = '/UsersInfo/';
  usersRef: AngularFireList<Array<User>> = null;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = this.db.list(this.dbUsers);
  }

  getUsersGenInfo(): AngularFireList<Array<User>> {
    return this.usersRef;
  }

  getUserInfo(uid: string): AngularFireObject<any> {
    return this.db.object('/Addresses/' + uid);
  }

  deleteUserInfo(uid) {
    this.db.object('/Addresses/' + uid).remove();
    this.db.object('/UsersInfo/' + uid).remove();
  }
}
