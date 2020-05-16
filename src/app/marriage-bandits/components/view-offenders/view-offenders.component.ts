import { Component, OnInit } from '@angular/core';
import { GPFIButton, ColumnDefs } from 'src/app/components/controls/data-table/classes/Columns';
import { MarriageBanditService } from '../../services/marriageBandits.service';
import { BehaviorSubject } from 'rxjs';
import { OffendersService } from '../../services/offenders.service';
import { User } from 'src/app/shared/models/user';
import { PageSettings } from 'src/app/components/controls/data-table/classes/Paging';
import { GeneralSettings } from 'src/app/components/controls/data-table/classes/General';
import { Offender } from '../../models/offender';
import { tap, switchMap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/services/Mongodb/api-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-offenders',
  templateUrl: './view-offenders.component.html',
  styleUrls: ['./view-offenders.component.css']
})
export class ViewOffendersComponent implements OnInit {
  
  pageSettings: PageSettings;
  generalSettings = new GeneralSettings();
  data = new BehaviorSubject<Array<any>>([]);
  colDefinitions: Array<ColumnDefs>;
  searchedOffender: Offender = { _id:'', firstName:'', lastName:'', alsoKnownAs:'', address:'', dateOfBirth:'', description:'', masjid:'', verified: false}
  
  constructor(private banditService: MarriageBanditService, private offenderService: OffendersService,  private router: Router) {

    this.setUpColumnDefintion();
    this.setUppageSettings();
   }

  ngOnInit(): void {
    this.onPageChange();
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
        key: 'alsoKnownAs',
        className: 'data_grid_center_align',
        header: 'Also Known As',
        responsivePriority: true
      },
      {
        key: 'address',
        className: 'data_grid_left_align',
        header: 'Address',
        responsivePriority: true
      },
      {
        key: 'dateOfBirth',
        className: 'data_grid_center_align',
        header: 'D.O.B',
        responsivePriority: true
      },
      {
        key: 'description',
        className: 'data_grid_center_align',
        header: 'Description'
      },
      {
        key: 'masjid',
        className: 'data_grid_center_align',
        header: 'Local Masjid'
      },
      {
        cellElement: (cellData, rowData, row) => {
          return new GPFIButton('view',()=>{
            this.router.navigate(['offenderView/' + rowData._id])
          });
        }, className: 'data_grid_center_align', responsivePriority: true
      }
    ];
  }

  setUppageSettings() {
    this.pageSettings = new PageSettings(() => {
      this.onPageChange();
    });
  }

  onPageChange() {
    let pg = this.pageSettings.currentPage - 1;
    let pgS = this.pageSettings.pageSize;
    this.offenderService.searchOffender(pg, pgS, this.searchedOffender).subscribe(
      (data: any) => { this.pageSettings.setTotalRecords(data.count); this.data.next(data.data) },
      err => { console.log(err); }
    );
  }

  search() {
     this.offenderService.searchOffender(this.pageSettings.currentPage-1, this.pageSettings.pageSize, this.searchedOffender)
     .subscribe(
      (data: any) => {
        console.log(data);
        this.pageSettings.setTotalRecords(data.count);
        this.data.next(data.data);
      },
      err => { console.log(err) }
    );
  }
}
