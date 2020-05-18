import { Component, OnInit } from '@angular/core';
import { switchMap, tap, filter } from 'rxjs/operators';
import { Address } from 'src/app/shared/models/address';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserMdbService } from 'src/app/shared/services/Mongodb/user-mdb.service';
import { AddressMdbService } from '../../services/Mongodb/address-mdb.service';
import { AppState } from 'src/app/state/models/app-state-models';
import { Store } from '@ngrx/store';
import { SelectCurrentUserInfo } from 'src/app/state/user-actions';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  newUser: User= {_id:'', name:'', email:'', phone:'', roles:[''], institution: ''};
  newAddress: Address = { _id:'',zip:'', addressLine1:'', addressLine2:'', longitude:'', latitude:''}

  constructor(private store: Store<AppState>,private mDBUserService: UserMdbService, private mDBAddressService: AddressMdbService, private auth: AuthService) {
  }

  ngOnInit() {
    // this.auth.appUser$.pipe(
    //   filter(data => !!data),
    //   tap(data => { 
    //     debugger;
    //     this.newUser = data;
    //     this.newAddress._id = data._id
    //   }),
    //   switchMap(data => this.mDBAddressService.get(data._id))
    // ).pipe(filter(data => !!data)).subscribe(
    //   (data: any) => {
    //     debugger;
    //     this.newAddress = data;
    //   },
    //   err => { console.log(err) }
    // );
  }

  addUserInfo() {
    this.mDBUserService.updateUserInfo(this.newUser).pipe(
      switchMap(() => this.mDBAddressService.updateAddress(this.newAddress._id, this.newAddress))
    ).subscribe(success => { console.log(success); },
      err => { console.log(err); }
    );
  }
}
