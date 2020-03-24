import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

import { User } from '../models/user';
// import { AppUser } from '../models/app-user';
// import { FirebaseObjectObservable } from '@angular/fire/database-deprecated';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private db: AngularFireDatabase) { }

  addUserInfo(newUser: User) {
        this.db.object('/UsersInfo/' + newUser._id).update({
          name: newUser.name,
          phone: newUser.phone,
          email: newUser.email
        });
      }

  get(uid: string): AngularFireObject<User> {
    // Get observable of user is Admin ?
    return this.db.object('/UsersInfo/' + uid);
  }

  // After Login check if the user have entered his Address data
  checkUserInfo(uid: string) {
    return this.db.object('/UsersInfo/' + uid)
  }
  
}
