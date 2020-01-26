import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { User } from '../models/user';
// import { AppUser } from '../models/app-user';
// import { FirebaseObjectObservable } from '@angular/fire/database-deprecated';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private db: AngularFireDatabase) { }

  addUserInfo(newUser: User, user) {
        this.db.object('/users/' + user.uid).update({
          name: newUser.name,
          phone: newUser.phone,
          email: user.email
        });
      }

  get(uid: string): AngularFireObject<User> {
    // Get observable of user is Admin ?
    return this.db.object('/users/' + uid);
  }
  
}
