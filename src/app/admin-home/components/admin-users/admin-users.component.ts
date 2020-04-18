import { Component, OnInit, OnDestroy } from '@angular/core';
import { Address } from 'src/app/shared/models/address';
import { DataTableService } from 'src/app/shared/services/data-table.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserMdbService } from 'src/app/shared/services/Mongodb/user-mdb.service';
import { AddressMdbService } from 'src/app/shared/services/Mongodb/address-mdb.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  userAddressInfo = new Address();
  userUid: string = null;

  constructor(private route: ActivatedRoute, private addressMdbService: AddressMdbService) {
    this.userUid = this.route.snapshot.paramMap.get('id');
    if (this.userUid) { this.getUserAddressDetails(this.userUid); }
  }

  ngOnInit() {
  }

  getUserAddressDetails(uid) {
    this.addressMdbService.get(uid)
      .subscribe((data: Address) => {
        this.userAddressInfo = data;
      })
  }

  EditUserAddInfo() {
    this.addressMdbService.updateAddress(this.userUid, this.userAddressInfo).subscribe((data) =>
      console.log(data));
  }

}
