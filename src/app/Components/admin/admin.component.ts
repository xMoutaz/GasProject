import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataTableService } from 'src/app/services/data-table.service';
import { map } from 'rxjs/operators';
import { ColumnDefs, GPFIButton } from '../data-table/classes/Columns';
import { Address } from 'src/app/models/address';
import { MatDialog } from '@angular/material/dialog';
import { AdminUsersComponent } from '../admin-users/admin-users.component';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  

  data = new BehaviorSubject<Array<any>>([]);
  columns : Array<any>;
  colDefinitions: Array<ColumnDefs>;

  title = 'Example of Angular 8 DataTable';
  userAddressInfo = new Address();

  constructor(
    private datatablesServices : DataTableService, 
    private router: Router,
    private adminUser: AdminDataService) 
  {
    this.setUpColumnDefintion();
    this.getRows();

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
        className: 'data_grid_left_align',
        header: 'Email'
      },
      {
        key:'name',
        className: 'data_grid_left_align',
        header: 'Name'
      },
      {
        key:'phone',
        className: 'data_grid_left_align',
        header: 'Phone Number'
      },
      // Column CONFIGURE GPFIButton
      { cellElement: () => {
        return new GPFIButton("CONFIGURE", (data) => {
          console.log(data.key);
          // this.getUserAddressDetails(data.key);
          this.adminUser.changeTargetUid(data.key);
          this.router.navigate(['admin-user']);
        });
      },
    },
    ];
  }
  getRows() {    
    this.datatablesServices.getUsersGenInfo()
    .snapshotChanges()
    .pipe(
      map(changes => 
        changes.map(c => 
          ({key:c.key , ...c.payload.val() })))
      ).subscribe(data => {
        data.forEach((data)=> {
          this.addData(data)
        });
      });
    }

      getUserAddressDetails(uid)  {
      this.datatablesServices.getUserInfo(uid).valueChanges()
      .subscribe(data => {
        this.userAddressInfo = data;
      });
      }
    

    addData(fireBData) {
      const currentValue = this.data.value;
      const updataValue = [...currentValue, fireBData];
      this.data.next(updataValue); //it is publishing this value to all the subscribers that have already subscribed to this message
  }
}


