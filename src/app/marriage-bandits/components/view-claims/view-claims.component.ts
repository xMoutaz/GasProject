import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ColumnDefs, GPFIButton } from 'src/app/components/controls/data-table/classes/Columns';
import { MarriageBanditService } from '../../services/marriageBandits.service';
import { ActionMenuComponent, ActionButton } from 'src/app/components/controls/action-menu/action-menu.component';
import { Router } from '@angular/router';
import { ClaimsService } from '../../services/claims.service';
import { PageSettings } from 'src/app/components/controls/data-table/classes/Paging';
import { GeneralSettings } from 'src/app/components/controls/data-table/classes/General';
import { switchMap } from 'rxjs/operators';
import { OffendersService } from '../../services/offenders.service';
import { ClaimantService } from '../../services/claimant.service';

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

  constructor(private claimsServer: ClaimsService, private offenderService: OffendersService, 
    private router:Router, private claimantService: ClaimantService) {
    
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
      this.pageSettings.setTotalRecords(data.data);
    });
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key:"offender.firstName",
        className: 'data_grid_left_align',
        header: 'Offender',
        formatter: (data,type, row) => {
          return data + " " + (row.offender.lastName || "")
        }
      },
      {
        key: 'offender.address',
        className: 'data_grid_left_align',
        header: 'Address',
        responsivePriority: true
      },
      {
        key: 'offender.description',
        className: 'data_grid_left_align',
        header: 'Description'
      },
      {
        key: 'claimant.firstName',
        className: 'data_grid_left_align',
        header:'Claimant',
        formatter: (data,type, row) => {
          return data + " " + (row.claimant.lastName || "")
        },
        responsivePriority: true
      },
      {
        key: 'dateOfEntry',
        className: 'data_grid_center_align',
        header: 'Time of claim'
      },
      {
        key: 'offender.verified',
        className: 'data_grid_center_align',
        header: 'Verified'
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
    let deleteClaim = new ActionButton();
    deleteClaim.label = "Remove Claim";
    deleteClaim.data = rowData;
    deleteClaim.action = (data => {
      this.removeClaim(data);
    });
    menu.buttons.push(editAddressInfo, deleteClaim);
    return menu;
  };

  setUppageSettings() {
    this.pageSettings = new PageSettings(() => {
      this.onPageChange();
    });
  }

  search(){
    
  }

  onPageChange() {
    let pg = this.pageSettings.currentPage - 1;
    let pgS = this.pageSettings.pageSize;
    this.claimsServer.getClaims(pg, pgS).subscribe(
      (data: any) => { this.data.next(data.data) },
      err => { console.log(err); }
    );
  }

  removeClaim(data) {
    // {_id: "5eab211f7404544b3cbe0cc9", verified: false, 
    // claimant_id: "5eab211f7e34e50003043a2f", 
    // offender_id: "5eab211f7e34e50003043a30"      
    this.claimsServer.archivingClaim(data._id).subscribe(data => console.log(data));
  }
}
