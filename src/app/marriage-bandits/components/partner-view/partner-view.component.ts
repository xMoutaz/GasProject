import { Component, OnInit } from '@angular/core';
import { PageSettings } from 'src/app/components/controls/data-table/classes/Paging';
import { GeneralSettings } from 'src/app/components/controls/data-table/classes/General';
import { ColumnDefs } from 'src/app/components/controls/data-table/classes/Columns';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../../models/person';
import { SpouseService } from '../../services/spouse.service';
import { Router } from '@angular/router';
import { ActionMenuComponent, ActionButton } from 'src/app/components/controls/action-menu/action-menu.component';
import * as moment from 'moment-mini';

@Component({
  selector: 'app-partner-view',
  templateUrl: './partner-view.component.html',
  styleUrls: ['./partner-view.component.css']
})
export class PartnerViewComponent implements OnInit {

  pageSettings: PageSettings;
  generalSettings = new GeneralSettings();
  colDefinitions: Array<ColumnDefs>;
  data = new BehaviorSubject<Array<any>>([]);
  gender: string = "male";
  searchedPerson: Person = { _id: '', firstName: '', lastName: '', address: '', dateOfBirth: '', postCode: '', identificationId: '' };

  constructor(private spoucseService: SpouseService, private router: Router) {
    this.setUpColumnDefintion();
    this.setUppageSettings();
  }

  ngOnInit(): void {
    this.onPageChange();
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key: "firstName",
        className: 'data_grid_left_align',
        header: 'Name',
        formatter: (data, type, row) => {
          return data + " " + (row.lastName || "")
        },
        responsivePriority: true
      },
      {
        key: 'dateOfBirth',
        className: 'data_grid_center_align',
        header: 'D.O.B',
        formatter:(data) =>{
          return moment(data).format("DD/MM/YYYY");
        }
      },
      {
        key: 'marriages',
        className: 'data_grid_center_align',
        header: 'Number of Marriages',
        formatter: (data, type, row) => {
             return data.length; 
      },
        responsivePriority: true
      },
      {
        key: 'marriages',
        className: 'data_grid_center_align',
        header: 'Number of Divorces',
        formatter: (data, type, row) => {
          let count =0;
          data.forEach(element => {
            if(element.divorce.length > 0)
            count ++
          });
          return count;
      },
        responsivePriority: true
      },
      {
        key: 'isFlagged',
        className: 'data_grid_center_align',
        header:'',
        cellElement: (cell,rowData,row,col,td) => {
          $(td).html('');
          if(cell){
            $(td).append(`<span class="glyphicon glyphicon-exclamation-sign" ></span>`)
          }
        }
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
    let viewPartenerInfo = new ActionButton();
    viewPartenerInfo.label = "View All Marriages Information";
    viewPartenerInfo.data = rowData;
    viewPartenerInfo.action = (data) => {
      this.router.navigate(['viewPartener'],
        {
          queryParams: { ...data, gender: this.gender}
        });
    };
    menu.buttons.push(viewPartenerInfo);
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
    this.spoucseService.getPartners(pg, pgS, this.searchedPerson, this.gender).subscribe((data: any) => {
      // console.log(data.data.marriages.length);      
      this.pageSettings.setTotalRecords(data.count[0].count)
      this.data.next(data.data);
    })
  }

  search() {
    let pg = this.pageSettings.currentPage - 1;
    let pgS = this.pageSettings.pageSize;
    this.spoucseService.getPartners(pg, pgS, this.searchedPerson, this.gender).subscribe((data: any) => {
      this.pageSettings.setTotalRecords(data.count[0].count)
      this.data.next(data.data);
    });
  }
}
