import { Component, OnInit, OnDestroy } from '@angular/core';
import { Address } from 'src/app/shared/models/address';
import { DataTableService } from 'src/app/shared/services/data-table.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { AdminDataService } from '../../services/admin-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  userAddressInfo = new Address();
  userUid: string;
  
  constructor(
    private route: ActivatedRoute,
    private adminUser: AdminDataService,
    private datatablesServices: DataTableService,
    private adrsServices : AddressService) {
      
      // let id = this.route.snapshot.paramMap.get('id');
      // if (id) this.adrsServices.get(id)
      //   .valueChanges().pipe().subscribe(u => this.userUid);
      //   console.log('userUid: ');
      //   console.log(this.userUid);
     }


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
