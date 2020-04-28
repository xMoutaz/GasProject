import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ColumnDefs, GPFIButton } from 'src/app/components/controls/data-table/classes/Columns';
import { MarriageBanditService } from '../../services/marriageBandits.service';
import { ActionMenuComponent, ActionButton } from 'src/app/components/controls/action-menu/action-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-claims',
  templateUrl: './view-claims.component.html',
  styleUrls: ['./view-claims.component.css']
})
export class ViewClaimsComponent implements OnInit {

  data = new BehaviorSubject<Array<any>>([]);
  colDefinitions: Array<ColumnDefs>;

  constructor(private banditService: MarriageBanditService, private router:Router) {
    this.setUpColumnDefintion();
   }

  ngOnInit(): void {
    this.banditService.getClaimsView().subscribe(claims => {
      this.data.next(claims);
    });
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key: 'firstName',
        className: 'data_grid_left_align',
        header: 'First Name'
      },
      {
        key: 'lastName',
        className: 'data_grid_left_align',
        header: 'Last Name',
        responsivePriority: true
      },
      {
        key: 'address',
        className: 'data_grid_left_align',
        header: 'Adress',
        responsivePriority: true
      },
      {
        key: 'claiment',
        className: 'data_grid_center_align',
        header: 'claiment',
        responsivePriority: true
      },
      {
        key: 'loggedTime',
        className: 'data_grid_center_align',
        header: 'loggedTime'
      },
      {
        cellElement: (cellData, rowData, row) => {
          return this.generateActionMenuForRfr(cellData, rowData, row);
        }, className: 'data_grid_center_align', responsivePriority: true
      }
    ];
  }

  generateActionMenuForRfr(cellData, rowData, row) {
    let menu = new ActionMenuComponent();
    let editAddressInfo = new ActionButton();
    editAddressInfo.label = "View Claim";
    editAddressInfo.data = rowData;
    editAddressInfo.action = (data) => {
      this.router.navigate([`admin/admin-user/` + `${data._id}`]);
    };
    let viewRecord = new ActionButton();
    viewRecord.label = "View Record";
    viewRecord.data = rowData;
    viewRecord.action = (data => {
      //this.deleteUserInfo(data._id);
    });
    let deleteClaim = new ActionButton();
    deleteClaim.label = "Delete Claim";
    deleteClaim.data = rowData;
    deleteClaim.action = (data => {
      //this.deleteUserInfo(data._id);
    });
    menu.buttons.push(editAddressInfo, viewRecord, deleteClaim);
    return menu;
  };


}
