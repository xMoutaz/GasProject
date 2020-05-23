import { Component, OnInit } from '@angular/core';
import { switchMap, tap, filter, map, take } from 'rxjs/operators';
import { Address } from 'src/app/shared/models/address';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserMdbService } from 'src/app/shared/services/Mongodb/user-mdb.service';
import { AddressMdbService } from '../../services/Mongodb/address-mdb.service';
import { AppState } from 'src/app/state/models/app-state-models';
import { Store } from '@ngrx/store';
import { SelectCurrentUserInfo } from 'src/app/state/user-actions';
import { User } from '../../models/user';
import { Observable, observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  newUser: User= {_id:'', name:'', email:'', phone:'', roles:[''], institution: ''};
  newAddress: Address = { _id:'',zip:'', addressLine1:'', addressLine2:'', longitude:'', latitude:''}
  _id: Observable<string>;
  constructor(private store: Store<AppState>, private mDBAddressService: AddressMdbService, private router: Router,
    private userService: UserMdbService) {
  }

  ngOnInit() {
    this.store.select(store => store.User.user).pipe(take(1)).subscribe(data => this.newUser._id = data._id);
  }

  addUserInfo() {
    this.userService.updateUserInfo(this.newUser).subscribe(data => data);
      this.mDBAddressService.updateAddress(this.newUser._id, this.newAddress)
    .subscribe(success => { this.router.navigate(['']); },
      err => { console.log(err); }
    );
  }
}
