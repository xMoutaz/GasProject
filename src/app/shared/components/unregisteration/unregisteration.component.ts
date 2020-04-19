import { Component, OnInit } from '@angular/core';
import { UserMdbService } from '../../services/Mongodb/user-mdb.service';
import { AuthService } from '../../services/auth.service';
import { AdminFirebasaeService } from 'src/app/admin-home/services/admin-firebasae.service';
import { Router } from '@angular/router';
import { concatMap, mergeMap } from 'rxjs/operators';
import { User } from '../../models/user';
import { AddressMdbService } from '../../services/Mongodb/address-mdb.service';
import { Address } from '../../models/address';

@Component({
  selector: 'app-unregisteration',
  templateUrl: './unregisteration.component.html',
  styleUrls: ['./unregisteration.component.css']
})
export class UnregisterationComponent implements OnInit {

  appUser: User;
  address: Address;
  
  constructor(public auth: AuthService, private userMdbServices: UserMdbService, private addressMdbService: AddressMdbService,
    private adminFBUser: AdminFirebasaeService, private router: Router) { }

  ngOnInit(): void {
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
