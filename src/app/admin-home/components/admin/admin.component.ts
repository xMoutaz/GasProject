import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { concatMap, mergeMap, filter, switchMap, tap } from 'rxjs/operators';
import { GeneralSettings } from 'src/app/components/controls/data-table/classes/General';
import { Address } from 'src/app/shared/models/address';
import { User } from 'src/app/shared/models/user';
import { AddressMdbService } from 'src/app/shared/services/Mongodb/address-mdb.service';
import { UserMdbService } from 'src/app/shared/services/Mongodb/user-mdb.service';
import { ActionButton, ActionMenuComponent } from '../../../components/controls/action-menu/action-menu.component';
import { ColumnDefs } from '../../../components/controls/data-table/classes/Columns';
import { AdminFirebasaeService } from '../../services/admin-firebasae.service';
import { PageSettings } from 'src/app/components/controls/data-table/classes/Paging';

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
  pageSettings: PageSettings;
  generalSettings = new GeneralSettings();
  
  constructor(
    private userMdbService: UserMdbService, private addressMdbService: AddressMdbService, private adminFBUser: AdminFirebasaeService, private router: Router) {
    this.searchedUser.name = "";
    this.searchedUser._id = "";
    
    this.getTotalRecord();
    this.setUpColumnDefintion();
    this.setUppageSettings();
  }

  ngOnInit() {
    this.onPageChange();
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key: '_id',
        className: 'data_grid_left_align',
        header: 'Id'
      },
      {
        key: 'name',
        className: 'data_grid_left_align',
        header: 'Name',
        responsivePriority: true
      },
      {
        key: 'email',
        className: 'data_grid_left_align',
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
        header: 'Admin',
        cellElement: (cellData, rowData, row, col, td) => {
          let checkBox = $("<input style='form-control' type='checkbox'/>");
          checkBox.prop("checked", !!cellData);
          checkBox.change(rowData, (e) => {
            let isChecked = (e.currentTarget as any).checked;
            let data = e.data;
            data.isAdmin = isChecked;
            this.makeAdmin(data);
          });
          $(td).html('');
          $(td).append(checkBox);
        }

      },
      {
        cellElement: (cellData, rowData, row) => {
          return this.generateActionMenuForRfr(cellData, rowData, row);
        }, className: 'data_grid_center_align', responsivePriority: true
      }
    ];
  }

  setUppageSettings() {
    this.pageSettings = new PageSettings(() => {
      this.onPageChange();
    });
  }

  getTotalRecord() {
    this.userMdbService.getTotalRecord(this.searchedUser).subscribe((data: number) => {
      this.pageSettings.setTotalRecords(data);
    });
  }

  onPageChange() {
    let pg = this.pageSettings.currentPage - 1;
    let pgS = this.pageSettings.pageSize;
    this.userMdbService.searchUser(pg, pgS, this.searchedUser).subscribe(
      data => { this.data.next(data) },
      err => { console.log(err); }
    );
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
    menu.buttons.push(editAddressInfo, deleteButton);
    return menu;
  };

  deleteUserInfo(uid) {
    if (confirm('Are you sure want to delte this user?')) {
      this.adminFBUser.deleteFBUser(uid).pipe(
        concatMap(id => this.userMdbService.deleteUser(id).pipe(
          mergeMap(() => this.addressMdbService.deleteAddress(id))))
      ).subscribe(
        success => { 
          this.generalSettings.DeleteRow({ _id: uid, propertyName: "_id" });
        console.log(success); 
      },
        err => { console.log(err); }
      );
      // Todo: update the table
    }
  }

  search() {
    this.userMdbService.getTotalRecord(this.searchedUser).pipe(
      tap(totalRecord => this.pageSettings.setTotalRecords(totalRecord)),
      switchMap(() => this.userMdbService.searchUser(this.pageSettings.currentPage-1, this.pageSettings.pageSize, this.searchedUser))
    ).subscribe(
      (data) => {
        this.data.next(data);
      },
      err => { console.log(err) }
    );
  }

  makeAdmin(data) {
    this.userMdbService.setAdmin(data)
    .pipe(filter((data:any) => data.ok ===1))
    .subscribe();
  }

}