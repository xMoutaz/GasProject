import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/shared/models/address';
import { AddressMdbService } from 'src/app/shared/services/Mongodb/address-mdb.service';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  
  userAddressInfo = new Address();
  userUid: string = null;

  constructor(private route: ActivatedRoute, private addressMdbService: AddressMdbService, private _location: Location) {
    this.userUid = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.userUid) {this.getUserAddressDetails(this.userUid); }
  }

  getUserAddressDetails(uid) {
    this.addressMdbService.get(uid).pipe(filter(data => !!data))
      .subscribe((data: Address) => {
        this.userAddressInfo = data;
      })
  }

  EditUserAddInfo() {
       this.addressMdbService.updateAddress(this.userUid, this.userAddressInfo)
      .subscribe(success => { 
        console.log(success);
      },
        error => {
          console.log(error);
        }
      );
  }

  backButton() {
    this._location.back();
  }
}
