import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ColumnDefs, GPFIButton } from '../../../components/data-table/classes/Columns';
import { MatDialog } from '@angular/material/dialog';
import { AdminUsersComponent } from '../admin-users/admin-users.component';
import { Router } from '@angular/router';
import { AdminDataService } from '../../services/admin-data.service';
import { ActionMenuComponent, ActionButton } from '../../../components/action-menu/action-menu.component';
import { ExpansionSettingsHandler, ExpansionSettings } from '../../../components/data-table/classes/Expansion';
import { User } from 'src/app/shared/models/user';
import { Address } from 'src/app/shared/models/address';
import { DataTableService } from 'src/app/shared/services/data-table.service';

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
    private datatablesServices : DataTableService, 
    private router: Router,
    private adminUser: AdminDataService) 
  {
    this.setUpColumnDefintion();
    this.getNewRows();
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key:'key',
        className: 'data_grid_left_align',
        header: 'Key'
      },
      {
        key:'email',
        className: 'data_grid_center_align',
        header: 'Email'
      },
      {
        key:'name',
        className: 'data_grid_center_align',
        header: 'Name'
      },
      {
        key:'phone',
        className: 'data_grid_center_align',
        header: 'Phone Number'
      },
      // Column CONFIGURE GPFIButton
      { cellElement: () => {
        return new GPFIButton("CONFIGURE", (data) => {
          // this.getUserAddressDetails(data.key);
          this.adminUser.changeTargetUid(data.key);
          // this.router.navigate(['admin-user']);
        });
      }, className: 'data_grid_center_align'
    },
    {  cellElement: (cellData, rowData, row) => {
      return this.generateActionMenuForRfr(cellData, rowData, row);
    }, className: 'data_grid_center_align', responsivePriority:true
    }
    ];
  }
  getNewRows() {
    this.datatablesServices.getUsersGenInfo()
    .snapshotChanges().pipe(
      map(changes =>      
        changes.map(c =>
          ({key:c.key, ...c.payload.val() })))
    ).pipe(take(1))
    .subscribe(data => {
      // this.data.next(data);   
          data.forEach((data)=>{
          this.addData(data); 
        });
      });
    }

  addData(fireBData) {
    const currentValue = this.data.value;
    const updataValue = [...currentValue, fireBData];
    this.data.next(updataValue); //it is publishing this value to all the subscribers that have already subscribed to this message
  }

  deleteUserInfo(uid) {
    if(confirm('Are you sure want to delte this user?')) {
      this.datatablesServices.deleteUserInfo(uid);
      // don't forget to update the table
    }
  }

  generateActionMenuForRfr(cellData, rowData, row) {
    let menu = new ActionMenuComponent();

    let editAddressInfo = new ActionButton();
    editAddressInfo.label = "edit address information";
    editAddressInfo.data = rowData;
    editAddressInfo.action = (data) => {
    this.adminUser.changeTargetUid(data.key);
    this.router.navigate(['admin/admin-user/']);
    };  
    let deleteButton = new ActionButton();
    deleteButton.label = "delete";
    deleteButton.data = rowData;
    deleteButton.action = (data => {
      this.deleteUserInfo(data.key);
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

  createAddLanguageOverlay() {
    this.router.navigate(['admin/add-language'])
  }
}

