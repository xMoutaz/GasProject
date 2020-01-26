import { Component, OnInit } from '@angular/core';
import { DataTableService } from 'src/app/services/data-table.service';
import { Address } from 'src/app/models/address';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  userAddressInfo = new Address();
  userUid: string;
  
  constructor(
    private adminUser: AdminDataService,
    private datatablesServices: DataTableService,
    private adrsServices : AddressService) { }

  ngOnInit() {
    this.adminUser.targetedUserUidObs.subscribe(key => {
        this.getUserAddressDetails(key);
        this.userUid = key;
        console.log(this.userUid);
      });
  }

  getUserAddressDetails(uid)  {
    this.datatablesServices.getUserInfo(uid).valueChanges()
    .subscribe(data => {
      this.userAddressInfo = data;
      console.log(this.userAddressInfo);
    });
  }

  EditUserAddInfo(userAddressInfo) {
    this.adrsServices.updateAddressInfo(userAddressInfo, this.userUid);
  }

}
