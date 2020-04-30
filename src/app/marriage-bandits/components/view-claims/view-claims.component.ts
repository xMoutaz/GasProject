import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ColumnDefs, GPFIButton } from 'src/app/components/controls/data-table/classes/Columns';
import { MarriageBanditService } from '../../services/marriageBandits.service';
import { ActionMenuComponent, ActionButton } from 'src/app/components/controls/action-menu/action-menu.component';
import { Router } from '@angular/router';
import { ClaimsService } from '../../services/claims.service';
import { PageSettings } from 'src/app/components/controls/data-table/classes/Paging';
import { GeneralSettings } from 'src/app/components/controls/data-table/classes/General';

@Component({
  selector: 'app-view-claims',
  templateUrl: './view-claims.component.html',
  styleUrls: ['./view-claims.component.css']
})
export class ViewClaimsComponent implements OnInit {

  pageSettings: PageSettings;
  generalSettings = new GeneralSettings();
  data = new BehaviorSubject<Array<any>>([]);
  colDefinitions: Array<ColumnDefs>;

  constructor(private claimsServer: ClaimsService, private banditService: MarriageBanditService, private router:Router) {
    
    this.getTotalRecord();
    this.setUpColumnDefintion();
    this.setUppageSettings();
  }

  ngOnInit(): void {
    this.onPageChange();
    // this.banditService.getClaimsView().subscribe(claims => {
    //   this.data.next(claims);
    // });
  }

  getTotalRecord() {
    this.claimsServer.getTotalRecord().subscribe((data) => {
      debugger;
      this.pageSettings.setTotalRecords(data.data);
    });
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key: 'offender.firstName',
        className: 'data_grid_left_align',
        header: 'First Name'
      },
      {
        key: 'offender.lastName',
        className: 'data_grid_left_align',
        header: 'Last Name',
        responsivePriority: true
      },
      {
        key: 'offender.address',
        className: 'data_grid_left_align',
        header: 'Adress',
        responsivePriority: true
      },
      {
        key: 'claimaint.firstName',
        className: 'data_grid_center_align',
        header: 'claiment',
        responsivePriority: true
      },
      {
        key: 'dateOfEntry',
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
      this.router.navigate([`claimView/` + `${data._id}`]);
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

  setUppageSettings() {
    this.pageSettings = new PageSettings(() => {
      this.onPageChange();
    });
  }

  onPageChange() {
    let pg = this.pageSettings.currentPage - 1;
    let pgS = this.pageSettings.pageSize;
    this.claimsServer.getClaims(pg, pgS).subscribe(
      (data: any) => { this.data.next(data.data) },
      err => { console.log(err); }
    );
  }

}
