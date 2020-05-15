import { Component, OnInit } from '@angular/core';
import { switchMap, tap, filter } from 'rxjs/operators';
import { Address } from '../../models/address';
// import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { AddressMdbService } from '../../services/Mongodb/address-mdb.service';
import { UserMdbService } from '../../services/Mongodb/user-mdb.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state/models/app-state-models';
import { Store } from '@ngrx/store';
import { User } from 'src/app/marriage-bandits/models/user';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  appUser: User = {_id:'', name:'', email:'', phone:'', roles:[''], institution: ''};
  address: Address = { _id:'', zip:'', addressLine1:'', addressLine2:'', longitude:'',latitude:''};
  constructor(public auth: AuthService, private userMdbServices: UserMdbService, private store: Store<AppState>,
     private addressMdbService: AddressMdbService, private _location: Location, private router: Router) {
  }

  ngOnInit(): void {
    
  }
  
  updateUserInfo() {
    this.userMdbServices.updateUserInfo(this.appUser).pipe(
      switchMap(() => this.addressMdbService.updateAddress(this.appUser._id, this.address))
    ).subscribe(success => { this.router.navigate(['']); console.log(success); },
      error => { console.log(error); }
    );
  }

  backButton() {
    this._location.back();
  }

}