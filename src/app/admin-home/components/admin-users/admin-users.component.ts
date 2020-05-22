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
  recordExist: boolean = false;

  constructor(private route: ActivatedRoute, private addressMdbService: AddressMdbService, private _location: Location) {
    this.userUid = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.userUid) {this.getUserAddressDetails(this.userUid); }
  }

  getUserAddressDetails(uid) {
    this.addressMdbService.get(uid).pipe(filter(data => !!data))
      .subscribe((data: Address) => {
        this.recordExist = true;
        this.userAddressInfo = data;
      })
  }

  EditUserAddInfo() {
    if (this.recordExist) {
       this.addressMdbService.updateAddress(this.userUid, this.userAddressInfo)
      .subscribe(success => { 
        console.log(success);
      },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.addressMdbService.saveAddress(this.userAddressInfo)
        .subscribe(success => { console.log(success) },
          err => {
            console.log(err);
          });
    }
  }

  backButton() {
    this._location.back();
  }
}
