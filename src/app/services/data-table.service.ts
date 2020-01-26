import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor(private db:  AngularFireDatabase) { }

  getUsersGenInfo() : AngularFireList<Array<any>> {
     return this.db.list('/users');
  }

  getUserInfo(uid: string): AngularFireObject<any> {
    // Get observable of user is Admin ?
    return this.db.object('/Addresses/' + uid);
  }
}
