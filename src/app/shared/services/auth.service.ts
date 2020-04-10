import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of, config } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import * as firebase from 'firebase';
import { UserService } from './user.service';
import { User } from '../models/user';
import { auth } from 'firebase/app';
import { UserMdbService } from './Mongodb/user-mdb.service';

// import * as functions from 'firebase-functions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$: Observable<firebase.User>;
  userMDB: User;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userMDBService : UserMdbService,
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
          this.router.navigate(['']);
        })
        .catch(err => {
          console.log('Something went wrong:',err.message);
          this.router.navigate(['signup']);
        });
    }

    facebookLogin() {
      this.AuthLogin(new auth.FacebookAuthProvider());
    }
    googlelogin() {
      this.AuthLogin(new auth.GoogleAuthProvider()) 
    }

    AuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
       .then((result) => {
         console.log(result);
         if(result.additionalUserInfo.isNewUser){
          this.router.navigate(['userDetails']);
         } else {
          this.router.navigate(['']);
         }
        // console.log(result.user);
        
        //   let uid = result.user.uid;
        //   console.log(uid);
          
          // this.userMDBService.checkUserInfo(uid) 
          // // this.ngZone.run(() => this.getEmployees()));
          // .subscribe((data : User) => {
          //   if (data !== null) {
          //     console.log(data);
          //     return data;
          //  this.router.navigate(['']);
          //   } else {
          //     this.router.navigate(['userDetails']);
          //   } //else
          // }) // subscribe
          
        }) // then 
        .catch(function(error) {
        // Handle Errors here.
        console.log(error);
        
        alert(error.message);
      });

      
      
      // .then((result) => {
      //   let user = this.appUser$;
      //   console.log(user);
        
      // })

      // .catch(function(error) {
      //   // Handle Errors here.
      //   alert(error.message);
      // });

      // .then((result) => {
      //   console.log(result.user);
        
      //     let uid = result.user.uid;
      //     console.log(uid);
          
          // this.userMDBService.checkUserInfo(uid) 
          // // this.ngZone.run(() => this.getEmployees()));
          // .subscribe((data : User) => {
          //   if (data !== null) {
          //     console.log(data);
              
          //     // this.router.navigate(['']);
          //   } else {
          //     this.router.navigate(['userDetails']);
          //   } //else
          // }) // subscribe
          
        // }) // then 
      }
        

    logout() {
      this.afAuth.auth.signOut();
      this.router.navigate(['']);
    }


    forgetPassword(email) {
      this.afAuth.auth.sendPasswordResetEmail(email).then(
        (success) => {
          console.log(success);
        },
        err => {
          console.log(err);
        }
      );
    }

   get appUser$(): Observable<User> {
    return this.user$
    .pipe(switchMap(user => {
      // Check if user is null or not
      if (user) {
         return this.userMDBService.get(user.uid);
        //  return this.userService.get(user.uid).valueChanges(); 
      }
      return of(null);
    }));
  }

  // deleteUser(uid) {
  //   admin.auth().deleteUser(uid)
  //   .then(() => console.log('Deleted user with ID:' + uid))
  //         .catch((error) => console.error('There was an error while deleting user:', error));
  // }
}
