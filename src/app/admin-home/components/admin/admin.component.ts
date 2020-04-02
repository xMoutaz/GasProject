import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, take, mergeMap, concatMap } from 'rxjs/operators';
import { ColumnDefs, GPFIButton } from '../../../components/controls/data-table/classes/Columns';
import { MatDialog } from '@angular/material/dialog';
import { AdminUsersComponent } from '../admin-users/admin-users.component';
import { Router } from '@angular/router';
import { AdminDataService } from '../../services/admin-data.service';
import { ActionMenuComponent, ActionButton } from '../../../components/controls/action-menu/action-menu.component';
import { ExpansionSettingsHandler, ExpansionSettings } from '../../../components/controls/data-table/classes/Expansion';
import { User } from 'src/app/shared/models/user';
import { Address } from 'src/app/shared/models/address';
import { DataTableService } from 'src/app/shared/services/data-table.service';
import { UserMdbService } from 'src/app/shared/services/Mongodb/user-mdb.service';
import { AddressMdbService } from 'src/app/shared/services/Mongodb/address-mdb.service';
import { error } from 'protractor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AdminFirebasaeService } from '../../services/admin-firebasae.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  data = new BehaviorSubject<Array<any>>([]);
  colDefinitions: Array<ColumnDefs>;

  newUser = new User();

  userAddressInfo = new Address();

  constructor(
    private userMdbService : UserMdbService,
    private addressMdbService: AddressMdbService,
    private adminFBUser : AdminFirebasaeService, 
    private router: Router,
    private adminUser: AdminDataService) 
  {
    this.setUpColumnDefintion();
    this.getNewRows();
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key:'_id',
        className: 'data_grid_left_align',
        header: 'Id',
        responsivePriority:true
      },
      {
        key:'name',
        className: 'data_grid_center_align',
        header: 'Name',
        responsivePriority:true
      },
      {
        key:'email',
        className: 'data_grid_center_align',
        header: 'Email',
        responsivePriority:true
      },
      {
        key:'phone',
        className: 'data_grid_center_align',
        header: 'Phone Number',
        responsivePriority:true
      },
    {  cellElement: (cellData, rowData, row) => {
      return this.generateActionMenuForRfr(cellData, rowData, row);
    }, className: 'data_grid_center_align', responsivePriority:true
    }
    ];
  }
  getNewRows() {
    this.userMdbService.getAll()
    .subscribe((data) => {
    this.data.next(data)
    console.log(data);
  })
  
    // this.datatablesServices.getUsersGenInfo()
    // .snapshotChanges().pipe(
    //   map(changes =>      
    //     changes.map(c =>
    //       ({key:c.key, ...c.payload.val() })))
    // ).pipe(take(1))
    // .subscribe(data => {
    //   // this.data.next(data);   
    //       data.forEach((data)=>{
    //       this.addData(data); 
    //     });
    //   });
    }

  // addData(fireBData) {
  //   const currentValue = this.data.value;
  //   const updataValue = [...currentValue, fireBData];
  //   this.data.next(updataValue); //it is publishing this value to all the subscribers that have already subscribed to this message
  // }

 

  generateActionMenuForRfr(cellData, rowData, row) {
    let menu = new ActionMenuComponent();

    let editAddressInfo = new ActionButton();
    editAddressInfo.label = "edit address information";
    editAddressInfo.data = rowData;
    editAddressInfo.action = (data) => {
      // stoped here
    this.router.navigate([`admin/admin-user/`+`${data._id}`]);
    };  
    let deleteButton = new ActionButton();
    deleteButton.label = "delete";
    deleteButton.data = rowData;
    deleteButton.action = (data => {
      this.deleteUserInfo(data._id);
    });
    let addLanguage = new ActionButton();
    addLanguage.label = "addLanguage";
    addLanguage.data = rowData;
    addLanguage.action = (data => {
      this.createAddLanguageOverlay();
    });

    menu.buttons.push(editAddressInfo, deleteButton, addLanguage);
    return menu;
  };

  deleteUserInfo(uid) {
    if(confirm('Are you sure want to delte this user?')) {
      // this.datatablesServices.deleteUserInfo(uid);
      // this.addressMdbService.delteAddress(uid).subscribe(
      //   () => console.log(`address with Id = ${uid} deleted`),
      //   (error) => console.log(error));

      // this.adminFBUser.deleteFBUser(uid).subscribe(
      //   (data) => console.log(data));
      
      // this.userMdbService.deleteUser(uid).subscribe(
      //   (data) => console.log(data, `User with Id = ${uid} deleted`));

      // this.addressMdbService.deleteAddress(uid).subscribe(
      //   (data) => console.log(data, `address with Id = ${uid} deleted`));
        

      this.adminFBUser.deleteFBUser(uid).pipe(
          concatMap(id => this.userMdbService.deleteUser(id).pipe(
              mergeMap(() => this.addressMdbService.deleteAddress(id))
            )
          )
      ).subscribe(
        success => { console.log(success); },
        err => { console.log(err); }
      );
      // don't forget to update the table
        // this.getNewRows();
    }
  }

  createAddLanguageOverlay() {
    this.router.navigate(['admin/add-language'])
  }
}

