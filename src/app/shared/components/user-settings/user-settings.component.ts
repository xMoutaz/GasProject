import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Address } from '../../models/address';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { AddressMdbService } from '../../services/Mongodb/address-mdb.service';
import { UserMdbService } from '../../services/Mongodb/user-mdb.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  appUser: User;
  address: Address;
  constructor(public auth: AuthService, private userMdbServices: UserMdbService, private addressMdbService: AddressMdbService,
    ) {
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


}