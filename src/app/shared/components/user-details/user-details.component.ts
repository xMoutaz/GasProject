import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Address } from 'src/app/shared/models/address';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserMdbService } from 'src/app/shared/services/Mongodb/user-mdb.service';
import { AddressMdbService } from '../../services/Mongodb/address-mdb.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  newUser = new User();
  newAddress = new Address();


  constructor(private mDBUserService: UserMdbService, private mDBAddressService: AddressMdbService, private auth: AuthService) {
    this.auth.appUser$.pipe(
      tap(appUser => this.newUser = appUser),
      switchMap(appUser =>
        this.mDBUserService.get(appUser._id))
    ).subscribe(
      (address: Address) => {
        this.newAddress = address
      },
      err => { console.log(err) }
    );
  }

  ngOnInit() {
  }

  addUserInfo() {
    this.mDBUserService.updateUserInfo(this.newUser).pipe(
      switchMap(() => this.mDBAddressService.updateAddress(this.newAddress._id, this.newAddress))
    ).subscribe(success => { console.log(success); },
      err => { console.log(err); }
    );
  }
}
