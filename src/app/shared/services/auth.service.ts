import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, tap, concatMap } from 'rxjs/operators';
import { User } from '../models/user';
import { MessageService } from './message.service';
import { UserMdbService } from './Mongodb/user-mdb.service';
import { AddressMdbService } from './Mongodb/address-mdb.service';
import { Address } from '../models/address';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/models/app-state-models';
import { SelectCurrentUserInfo } from 'src/app/state/user-actions';
import { MessageStatus, MessageType } from 'src/app/components/controls/message/messageStatus';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  userMDB: User;
  signedUpUser: User= new User();
  signedUpAddress: Address = new Address();

  constructor(private ngZone: NgZone, private statusMessageService: MessageService, private afAuth: AngularFireAuth, private router: Router,
    private userMDBService: UserMdbService, private addressMdbService: AddressMdbService, private store: Store<AppState>) {
    this.user$ = afAuth.authState;
  }
  // this.store.dispatch(new SelectCurrentUser(data)
  async signup(value) {
    this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
      .then(result => {
        this.signedUpUser.name = value.name;
        this.signedUpUser._id= this.signedUpAddress._id = result.user.uid;
        this.signedUpUser.email = result.user.email;
        this.userMDBService.saveUser(this.signedUpUser).pipe(
          switchMap((data) => this.addressMdbService.saveAddress(this.signedUpAddress))
        ).subscribe(data => this.statusMessageService.ClearMessage());

        
        this.ngZone.run(() => this.router.navigate(['userDetails']));
        // this.router.navigate(['userDetails']);
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
        console.log(result);
        if (result.additionalUserInfo.isNewUser) {
          this.signedUpUser.name = result.user.displayName;
          this.signedUpUser._id= this.signedUpAddress._id = result.user.uid;
          this.signedUpUser.email = result.user.email;
          this.userMDBService.saveUser(this.signedUpUser).pipe(
            switchMap(() => this.addressMdbService.saveAddress(this.signedUpAddress))
          ).subscribe(success =>{
            this.statusMessageService.ClearMessage();
            })
            this.ngZone.run(() => this.router.navigate(['userDetails']));
        } else {
          this.ngZone.run(() => this.router.navigate(['userDetails']));
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message);
      });
  }


  logout() {
    this.router.navigate(['']);
    this.afAuth.auth.signOut();
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
