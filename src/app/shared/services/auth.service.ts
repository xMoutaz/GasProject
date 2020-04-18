import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MessageStatus, MessageType } from 'src/app/components/controls/message/messageStatus';
import { User } from '../models/user';
import { MessageService } from './message.service';
import { UserMdbService } from './Mongodb/user-mdb.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  userMDB: User;
  signedUpUser: User;

  constructor(
    private statusMessageService: MessageService, private afAuth: AngularFireAuth, private router: Router,
    private userMDBService: UserMdbService) {
    this.user$ = afAuth.authState;
  }

  signup(value) {
    this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(value => {
        this.statusMessageService.ClearMessage();
        this.router.navigate(['userDetails']);
        { return auth; }
      })
      .catch(err => {
        let authError = err;
        let errorCode = authError.code;
        let errorMessage: string = authError.message;
        if (errorMessage === "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          this.statusMessageService.SetMessage(new MessageStatus(MessageType.Error, "", errorMessage))
        }
        console.log(err);
      });
  }

  emailLogin(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
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
        if (result.additionalUserInfo.isNewUser) {
          this.router.navigate(['userDetails']);
        } else {
          this.router.navigate(['']);
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message);
      });
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
        if (user) {
          return this.userMDBService.get(user.uid);
        }
        return of(null);
      }));
  }

  deleteCurrentUser() {
    this.afAuth.auth.currentUser.delete();
  }

}
