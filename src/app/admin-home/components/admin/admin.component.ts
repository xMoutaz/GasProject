import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { concatMap, mergeMap, filter } from 'rxjs/operators';
import { GeneralSettings } from 'src/app/components/controls/data-table/classes/General';
import { Address } from 'src/app/shared/models/address';
import { User } from 'src/app/shared/models/user';
import { AddressMdbService } from 'src/app/shared/services/Mongodb/address-mdb.service';
import { UserMdbService } from 'src/app/shared/services/Mongodb/user-mdb.service';
import { ActionButton, ActionMenuComponent } from '../../../components/controls/action-menu/action-menu.component';
import { ColumnDefs } from '../../../components/controls/data-table/classes/Columns';
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
  name: string;
  id: string;
  searchedUser = new User();
  generalSettings = new GeneralSettings();

  constructor(
    private userMdbService: UserMdbService, private addressMdbService: AddressMdbService, private adminFBUser: AdminFirebasaeService, private router: Router) {
    this.setUpColumnDefintion();
    this.getNewRows();
    this.searchedUser.name = "";
    this.searchedUser._id = "";
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key: '_id',
        className: 'data_grid_left_align',
        header: 'Id',
        responsivePriority: true
      },
      {
        key: 'name',
        className: 'data_grid_center_align',
        header: 'Name',
        responsivePriority: true
      },
      {
        key: 'email',
        className: 'data_grid_center_align',
        header: 'Email',
        responsivePriority: true
      },
      {
        key: 'phone',
        className: 'data_grid_center_align',
        header: 'Phone Number',
        responsivePriority: true
      },
      {
        key: 'isAdmin',
        className: 'data_grid_center_align',
        header: 'isAdmin',
        responsivePriority: true
      },
      {
        cellElement: (cellData, rowData, row) => {
          return this.generateActionMenuForRfr(cellData, rowData, row);
        }, className: 'data_grid_center_align', responsivePriority: true
      }
    ];
  }

  getNewRows() {
    this.userMdbService.getAll()
      .subscribe((data) => {
        this.data.next(data)
        console.log(data);
      })
  }

  generateActionMenuForRfr(cellData, rowData, row) {
    let menu = new ActionMenuComponent();
    let editAddressInfo = new ActionButton();
    editAddressInfo.label = "edit address information";
    editAddressInfo.data = rowData;
    editAddressInfo.action = (data) => {
      // stoped here
      this.router.navigate([`admin/admin-user/` + `${data._id}`]);
    };
    let deleteButton = new ActionButton();
    deleteButton.label = "delete";
    deleteButton.data = rowData;
    deleteButton.action = (data => {
      this.deleteUserInfo(data._id);
    });
    let addLanguage = new ActionButton();
    addLanguage.label = "set/unset Admin";
    addLanguage.data = rowData;
    addLanguage.action = (data => {
      data.isAdmin = !data.isAdmin;
      this.makeAdmin(data);
    });
    menu.buttons.push(editAddressInfo, deleteButton, addLanguage);
    return menu;
  };

  deleteUserInfo(uid) {
    if (confirm('Are you sure want to delte this user?')) {
      this.adminFBUser.deleteFBUser(uid).pipe(
        concatMap(id => this.userMdbService.deleteUser(id).pipe(
          mergeMap(() => this.addressMdbService.deleteAddress(id))))
      ).subscribe(
        success => { console.log(success); },
        err => { console.log(err); }
      );
      // Todo: update the table
    }
  }

  search() {
    this.userMdbService.searchUser(this.searchedUser).subscribe(
      data => { this.data.next(data) },
      err => { console.log(err); }
    );
  }

  makeAdmin(data) {
    this.userMdbService.setAdmin(data)
    .pipe(filter((data:any) => data.ok ===1))
    .subscribe(success => {this.generalSettings.UpddateRow({ id: data.id, propertyName: "id" }, data); });
  }

}