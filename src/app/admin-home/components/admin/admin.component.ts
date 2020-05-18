import { Component, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ActionButton, ActionMenuComponent } from 'src/app/components/controls/action-menu/action-menu.component';
import { ColumnDefs } from 'src/app/components/controls/data-table/classes/Columns';
import { ExpansionSettings } from 'src/app/components/controls/data-table/classes/Expansion';
import { GeneralSettings } from 'src/app/components/controls/data-table/classes/General';
import { PageSettings } from 'src/app/components/controls/data-table/classes/Paging';
import { Address } from 'src/app/shared/models/address';
import { User } from 'src/app/shared/models/user';
import { ApiResponse } from 'src/app/shared/services/Mongodb/api-response';
import { UserMdbService } from 'src/app/shared/services/Mongodb/user-mdb.service';
import { AppState } from 'src/app/state/models/app-state-models';
import { SelectCurrentUserInfo } from 'src/app/state/user-actions';
import { PrivilegeComponent } from '../privilege/privilege.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  
  data = new BehaviorSubject<Array<any>>([]);
  colDefinitions: Array<ColumnDefs>;
  userAddressInfo = new Address();
  name: string;
  id: string;
  searchedUser: User = {_id:'', name:'', email:'', phone:'', roles:[''], institution: ''}
  pageSettings: PageSettings;
  generalSettings = new GeneralSettings();
  expansionSettings: ExpansionSettings;
  Roles: any;
  currentUser: User;

  constructor(public CFR: ComponentFactoryResolver, private userMdbService: UserMdbService, private router: Router,
              private store: Store<AppState>) {
    // this.getTotalRecord();
    this.setUpColumnDefintion();
    this.expansionSettings = this.setupExpansionSettings();
    this.setUppageSettings();
    this.getUserRoles();
  }

  ngOnInit() {
    this.store.select(store => store.User.user).subscribe(user => {
      this.currentUser = user
    });
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
        key: 'email',
        className: 'data_grid_left_align',
        header: 'Email',
        responsivePriority: true
      },
      {
        key: 'name',
        className: 'data_grid_left_align',
        header: 'Name',
        responsivePriority: true
      },
      {
        key: 'roles',
        className: 'data_grid_left_align',
        header: 'Roles',
        responsivePriority: true
      },
      {
        key: 'phone',
        className: 'data_grid_center_align',
        header: 'Phone Number',
        responsivePriority: true
      },
      
      { cellElement: (cellData, rowData, row) => {
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
  getUserRoles() {
    this.userMdbService.getUserRoles().subscribe((data :any) => {this.Roles = data.roles});    
  }
  getTotalRecord() {
    this.userMdbService.getTotalRecord(this.searchedUser).subscribe((data) => {
      this.pageSettings.setTotalRecords(data.data);
    });
  }

  onPageChange() {
    let pg = this.pageSettings.currentPage - 1;
    let pgS = this.pageSettings.pageSize;
    this.userMdbService.searchUser(pg, pgS, this.searchedUser).subscribe(
      (data: any) => { this.data.next(data.data); this.pageSettings.setTotalRecords(data.data.count); },
      err => { console.log(err); }
    );
  }

  generateActionMenuForRfr(cellData, rowData, row) {
    let menu = new ActionMenuComponent();
    let assignPrivileges = new ActionButton();
    assignPrivileges.label = "Assign privileges";
    assignPrivileges.data = rowData;
    assignPrivileges.action = (data) => {
      this.expansionSettings.ExpandGrid({ id: data._id, propertyName: "_id" });
    };
    let deleteButton = new ActionButton();
    deleteButton.label = "delete";
    deleteButton.data = rowData;
    deleteButton.action = (data => {
      this.deleteUserInfo(data._id);
    });
    menu.buttons.push(assignPrivileges, deleteButton);
    return menu;
  };

  setupExpansionSettings() {
    return new ExpansionSettings(false, (viewContainerRef, rowData, row) => {
      return new Promise<any>((resolve) => {
        const componentResolve =
          this.CFR.resolveComponentFactory(PrivilegeComponent);
        let component = viewContainerRef.createComponent(componentResolve);
        component.instance.roles = this.Roles;
        console.log(this.Roles);
        
        component.instance.userlRoles = rowData.roles;
        component.instance.assign.subscribe(event => {
          this.userMdbService.assignPrivileges(component.instance.userlRoles, rowData._id)
            .pipe(filter((data: any) => data.success === true))
            .subscribe((data) => {
              this.store.dispatch(new SelectCurrentUserInfo(rowData))
              this.generalSettings.UpddateRow({ id: rowData._id, propertyName: "_id" }, rowData); });
          this.expansionSettings.CollapseGrid({ id: rowData._id, propertyName: "_id" });
        });
        component.instance.cancel.subscribe(event => {
          this.expansionSettings.CollapseGrid({ id: rowData._id, propertyName: "_id"});
        });
        resolve(component);
      });
    });
  }

  deleteUserInfo(uid) {
    if (confirm('Are you sure want to delte this user?')) {
        this.userMdbService.deleteUser(uid).subscribe(
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
      tap(data => this.pageSettings.setTotalRecords(data.data)),
      switchMap(() => this.userMdbService.searchUser(this.pageSettings.currentPage-1, this.pageSettings.pageSize, this.searchedUser))
    ).subscribe(
      (data: ApiResponse<User[]>) => {
        this.data.next(data.data);
      },
      err => { console.log(err) }
    );
  }

  makeAdmin(data) {
    this.userMdbService.setAdmin(data)
    .pipe(filter((data:any) => data.success ===true))
    .subscribe();
  }

}