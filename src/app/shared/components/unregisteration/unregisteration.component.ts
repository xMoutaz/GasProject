import { Component, OnInit, NgZone } from '@angular/core';
import { UserMdbService } from '../../services/Mongodb/user-mdb.service';
import { AuthService } from '../../services/auth.service';
import { AdminFirebasaeService } from 'src/app/admin-home/services/admin-firebasae.service';
import { concatMap, mergeMap, tap, switchMap, filter } from 'rxjs/operators';
import { User } from '../../models/user';
import { AddressMdbService } from '../../services/Mongodb/address-mdb.service';
import { Address } from '../../models/address';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/models/app-state-models';
import { SelectCurrentUserInfo } from 'src/app/state/user-actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unregisteration',
  templateUrl: './unregisteration.component.html',
  styleUrls: ['./unregisteration.component.css']
})
export class UnregisterationComponent implements OnInit {

  appUser: User;
  address: Address;

  constructor(public auth: AuthService, private userMdbServices: UserMdbService, private addressMdbService: AddressMdbService,private ngZone: NgZone,
    private adminFBUser: AdminFirebasaeService, private router: Router, private _location: Location, private store: Store<AppState>) { }

  ngOnInit(): void {
    // ----------------------
    this.store.select(store => store.User.user)
      .subscribe(data => {
        console.log(data);
        
        this.appUser = data;
      });
    // ----------------------
    this.auth.appUser$.pipe(
      tap(data => this.appUser = data),
      switchMap(data =>
        this.addressMdbService.get(data._id))
    ).subscribe(
      (data: any) => {
        this.address = data;
      },
      err => { console.log(err) }
    );
  }

  deleteAccount() {
    if (confirm('Are you sure want to delte this user?')) {
      this.ngZone.run(() => this.router.navigate(['']));
      this.adminFBUser.deleteFBUser(this.appUser._id).pipe(
        concatMap(id => this.userMdbServices.deleteUser(id).pipe(
          mergeMap(() => this.addressMdbService.deleteAddress(id))))
      ).subscribe(
        success => {
          this.store.dispatch(new SelectCurrentUserInfo(null));
        },
        err => { console.log(err); }
      );
    }
  }

  cancelButton() {
    this._location.back();
  }
}
