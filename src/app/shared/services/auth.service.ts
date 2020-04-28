import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, tap, concatMap, filter } from 'rxjs/operators';
import { User } from '../models/user';
import { MessageService } from './message.service';
import { UserMdbService } from './Mongodb/user-mdb.service';
import { AddressMdbService } from './Mongodb/address-mdb.service';
import { Address } from '../models/address';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/models/app-state-models';
import { SelectCurrentUserInfo } from 'src/app/state/user-actions';
import { MessageStatus, MessageType } from 'src/app/components/controls/message/messageStatus';
import { MarriageBanditsUserService } from './Mongodb/marriage-bandits-user.service';
import * as jwt from 'jsonwebtoken';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  userMDB: User;
  signedUpUser: User= new User();
  signedUpAddress: Address = new Address();
  token: Observable<any>;
  private  JWT_TOKEN = 'JWT_TOKEN';

  constructor(private store: Store<AppState>,private ngZone: NgZone, private statusMessageService: MessageService, private afAuth: AngularFireAuth, private router: Router,
    private userMDBService: UserMdbService, private addressMdbService: AddressMdbService, private MGBUser :MarriageBanditsUserService) {
    this.user$ = afAuth.authState;
    this.token = afAuth.idTokenResult;
  }
  // async signup(value) {
  //   this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
  //     .then(result => {
  //       this.signedUpUser.name = value.name;
  //       this.signedUpUser._id= this.signedUpAddress._id = result.user.uid;
  //       this.signedUpUser.email = result.user.email;
  //       this.userMDBService.saveUser(this.signedUpUser).pipe(
  //         switchMap((data) => this.addressMdbService.saveAddress(this.signedUpAddress))
  //       ).subscribe(data => this.statusMessageService.ClearMessage());
  //       this.ngZone.run(() => this.router.navigate(['userDetails']));
  //       { return auth; }
  //     })
  //     .catch(err => {
  //       let authError = err;
  //       let errorCode = authError.code;
  //       let errorMessage: string = authError.message;
  //       if (errorMessage === "auth/weak-password") {
  //         alert("The password is too weak.");
  //       } else {
  //         this.statusMessageService.SetMessage(new MessageStatus(MessageType.Error, "", errorMessage))
  //       }
  //       console.log(err);
  //     });
  // }

  async signup(value) {
    this.MGBUser.createUser(value).pipe(filter((data: any ) => data.success === true)).subscribe(
      data => {
        this.router.navigate(['/login']);
        console.log(data);
      }
    )}


  // emailLogin(email: string, password: string) {
  //   this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then(value => {
  //       this.router.navigate(['']);
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong:', err.message);
  //       this.router.navigate(['signup']);
  //     });
  // }

  emailLogin(email: string, password: string) {
    this.MGBUser.loginwithEmail({email, password})
    .pipe(filter((data: any ) => data.success === true))
    .subscribe((data: any) => { 
        this.store.dispatch(new SelectCurrentUserInfo(data.data.user));
        localStorage.setItem(this.JWT_TOKEN, data.data.token); 
        this.router.navigate(['']);
      })
  }

  facebookLogin() {
    this.AuthLogin(new auth.FacebookAuthProvider());
  }
  googlelogin() {
    this.AuthLogin(new auth.GoogleAuthProvider())
  }

  async AuthLogin(provider) {
    try {
      const result = await this.afAuth.auth.signInWithPopup(provider);
      console.log(result.credential);
      if (result.additionalUserInfo.isNewUser) {
        this.signedUpUser.name = result.user.displayName;
        this.signedUpUser._id = this.signedUpAddress._id = result.user.uid;
        this.signedUpUser.email = result.user.email;

        if (this.JWT_TOKEN && this.signedUpUser._id && this.signedUpUser.email && this.signedUpUser.name) {
          this.userMDBService.saveUser(this.signedUpUser).pipe(switchMap(() => this.addressMdbService.saveAddress(this.signedUpAddress))).subscribe(success => {
            this.statusMessageService.ClearMessage();
            this.ngZone.run(() => this.router.navigate(['userDetails']));
          });
        }
      }
      else {
        this.ngZone.run(() => this.router.navigate(['']));
      }
    }
    catch (error) {
      console.log(error);
      alert(error.message);
    }
  }


  logout() {
    this.router.navigate(['']);
    localStorage.removeItem(this.JWT_TOKEN);
    this.store.dispatch(new SelectCurrentUserInfo(null));
    // this.afAuth.auth.signOut();
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

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
}
