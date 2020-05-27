import { Component, ComponentFactoryResolver } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { concatMap, filter, map, mergeMap } from 'rxjs/operators';
import { ActionButton, ActionMenuComponent } from 'src/app/components/controls/action-menu/action-menu.component';
import { ColumnDefs } from 'src/app/components/controls/data-table/classes/Columns';
import { ExpansionSettings } from 'src/app/components/controls/data-table/classes/Expansion';
import { GeneralSettings } from 'src/app/components/controls/data-table/classes/General';
import { PageSettings } from 'src/app/components/controls/data-table/classes/Paging';
import { User } from 'src/app/shared/models/user';
import { AddressMdbService } from 'src/app/shared/services/Mongodb/address-mdb.service';
import { UserMdbService } from 'src/app/shared/services/Mongodb/user-mdb.service';
import { AppState } from 'src/app/state/models/app-state-models';
import { SelectCurrentUserInfo } from 'src/app/state/user-actions';
import { AdminFirebasaeService } from '../../services/admin-firebasae.service';
import { PrivilegeComponent } from '../privilege/privilege.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  data = new BehaviorSubject<Array<any>>([]);
  colDefinitions: Array<ColumnDefs>;
  pageSettings: PageSettings;
  generalSettings = new GeneralSettings();
  expansionSettings: ExpansionSettings;
  Roles: any;
  currentUser: User;
  searchedUser: User = { _id: '', name: '', email: '', phone: '', roles: [''], institution: '' }

  constructor(public CFR: ComponentFactoryResolver, private userMdbService: UserMdbService, private firebaseUser: AdminFirebasaeService,
    private addressMdbService: AddressMdbService, private store: Store<AppState>) {
    this.setUpColumnDefintion();
    this.expansionSettings = this.setupExpansionSettings();
    this.setUppageSettings();
  }

  ngOnInit() {
    this.store.select(store => store.User.user).subscribe(data => this.currentUser = data);
    this.getUserRoles();
    this.onPageChange();
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key: '_id',
        className: `data_grid_left_align`,
        header: 'Id'
      },
      {
        key: 'email',
        className: `data_grid_left_align`,
        header: 'Email',
        responsivePriority: true
      },
      {
        key: 'name',
        className: `data_grid_left_align`,
        header: 'Name',
        responsivePriority: true
      },
      {
        key: 'roles',
        className: `data_grid_left_align`,
        header: 'Roles',
        responsivePriority: true
      },
      {
        key: 'phone',
        className: 'data_grid_left_align',
        header: 'Phone Number',
        responsivePriority: true
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

  getUserRoles() {
    this.Roles = this.userMdbService.getUserRoles().pipe(map((data: any) => data.roles));
  }

  onPageChange() {
    let pg = this.pageSettings.currentPage - 1;
    let pgS = this.pageSettings.pageSize;
    this.userMdbService.searchUser(pg, pgS, this.searchedUser).subscribe(
      (data: any) => {
        this.pageSettings.setTotalRecords(data.count);
        this.data.next(data.data);
      },
      err => {
        console.log(err)
      }
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
              this.generalSettings.UpddateRow({ id: rowData._id, propertyName: "_id" }, rowData);
            });
          this.expansionSettings.CollapseGrid({ id: rowData._id, propertyName: "_id" });
        });
        component.instance.cancel.subscribe(event => {
          this.expansionSettings.CollapseGrid({ id: rowData._id, propertyName: "_id" });
        });
        resolve(component);
      });
    });
  }

  deleteUserInfo(uid) {
    if (this.currentUser._id == uid) {
      alert('You can not delete yourself, if you want to unregister go to unregisteration page');
    }
    else {
      if (confirm('Are you sure want to delte this user?')) {
        this.firebaseUser.deleteFBUser(uid).pipe(
          concatMap(id => this.userMdbService.deleteUser(id).pipe(
            mergeMap(() => this.addressMdbService.deleteAddress(id))))
        ).subscribe(
          success => {
            this.generalSettings.DeleteRow({ _id: uid, propertyName: "_id" });
          },
          err => { console.log(err); }
        );
      }
    }
  }

  search() {
    this.userMdbService.searchUser(this.pageSettings.currentPage - 1, this.pageSettings.pageSize, this.searchedUser)
      .subscribe(
        (data: any) => {
          this.pageSettings.setTotalRecords(data.count)
          this.data.next(data.data);
        },
        err => { console.log(err) }
      );
  }

}