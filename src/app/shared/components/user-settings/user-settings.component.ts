import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { AddressMdbService } from '../../services/Mongodb/address-mdb.service';
import { concatMap, map, tap, switchMap, mergeMap } from 'rxjs/operators';
import { Address } from '../../models/address';
import { UserMdbService } from '../../services/Mongodb/user-mdb.service';
import { AdminFirebasaeService } from 'src/app/admin-home/services/admin-firebasae.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  appUser: User;
  address: Address;
  constructor(public auth: AuthService, private userMdbServices: UserMdbService, private addressMdbService: AddressMdbService,
    private adminFBUser: AdminFirebasaeService, private router: Router) {
  }

  ngOnInit(): void {
    this.auth.appUser$.pipe(
      tap(appUser => this.appUser = appUser),
      switchMap(appUser =>
        this.addressMdbService.get(appUser._id))
    ).subscribe(
      (address: Address) => {
        this.address = address
      },
      err => { console.log(err) }
    );
  }

  updateUserInfo() {
    this.userMdbServices.updateUserInfo(this.appUser).pipe(
      switchMap(() => this.addressMdbService.updateAddress(this.appUser._id, this.address))
    ).subscribe(success => { console.log(success); },
      err => { console.log(err); }
    );
  }

  deleteAccount() {
    if (confirm('Are you sure want to delte this user?')) {
      this.adminFBUser.deleteFBUser(this.appUser._id).pipe(
        concatMap(id => this.userMdbServices.deleteUser(id).pipe(
          mergeMap(() => this.addressMdbService.deleteAddress(id))))
      ).subscribe(
        success => {
          console.log(success);
          this.auth.logout();
          this.router.navigate[('')];
        },
        err => { console.log(err); }
      );
      // Todo: update the table
    }
  }

}