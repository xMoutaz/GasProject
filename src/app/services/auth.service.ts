import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase';
import { UserService } from './user.service';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {

    this.user$ = afAuth.authState;
     }

    signup(value){
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(value => {
        this.router.navigate(['userDetails']);
      })
    }
    
    emailLogin(email: string, password: string) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(value => {
          this.router.navigate(['home']);
        })
        .catch(err => {
          console.log('Something went wrong:',err.message);
          this.router.navigate(['signup']);
        });
        }

    login() {
      this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }


    logout() {
      this.afAuth.auth.signOut();
    }
    
    // createUser(user: User): void {
    //   this.userRef.push(user);
    // }

   get appUser$(): Observable<User> {
    return this.user$
    .pipe(switchMap(user => {
      // Check if user is null or not
      if (user) { return this.userService.get(user.uid).valueChanges(); }

      return of(null);
    }));
  }
}
