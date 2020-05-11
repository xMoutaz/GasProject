import { Component, OnInit } from '@angular/core';
import { PageSettings } from 'src/app/components/controls/data-table/classes/Paging';
import { GeneralSettings } from 'src/app/components/controls/data-table/classes/General';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HusbandService } from '../../services/husband.service';
import { Person } from '../../models/person';
import { Marriage } from '../../models/marriage';
import { ColumnDefs } from 'src/app/components/controls/data-table/classes/Columns';
import { ActionMenuComponent, ActionButton } from 'src/app/components/controls/action-menu/action-menu.component';
import { MarriageService } from '../../services/marriage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-marriages',
  templateUrl: './view-marriages.component.html',
  styleUrls: ['./view-marriages.component.css']
})
export class ViewMarriagesComponent implements OnInit {

  pageSettings: PageSettings;
  generalSettings = new GeneralSettings();
  colDefinitions: Array<ColumnDefs>;
  data = new BehaviorSubject<Array<any>>([]);
  searchedHusband: Person = { _id:'', firstName:'', lastName:'',  address:'', dateOfBirth:'', postCode: '', identificationId: ''};
  searchedWife: Person = { _id:'', firstName:'', lastName:'',  address:'', dateOfBirth:'', postCode: '', identificationId: ''};
  searchedMarriage: Marriage = { _id: '', mahr: '', dateOfMarriage: '', institution: '',husbandId: '', wifeId: '', witness1Id: '', witness2Id: '' }

  constructor(private marriageService: MarriageService, private router: Router) { 
    this.setUpColumnDefintion();
    this.setUppageSettings();
  }

  ngOnInit(): void {
    this.onPageChange();
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key:"husband.firstName",
        className: 'data_grid_left_align',
        header: 'Husband',
        formatter: (data,type, row) => {
          return data + " " + (row.husband.lastName || "")
        },
        responsivePriority: true
      },
      {
        key:"wife.firstName",
        className: 'data_grid_left_align',
        header: 'Wife',
        formatter: (data,type, row) => {
          return data + " " + (row.wife.lastName || "")
        },
        responsivePriority: true
      },
      {
        key: 'dateOfMarriage',
        className: 'data_grid_center_align',
        header: 'Date of Nikkah',
        responsivePriority: true
      },
      {
        key: 'institution',
        className: 'data_grid_center_align',
        header: 'Marriage Institution',
        responsivePriority: true
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
    editAddressInfo.label = "View Marriage Information";
    editAddressInfo.data = rowData;
    editAddressInfo.action = (data) => {
      this.router.navigate([`marriageView/` + `${data._id}`]);
    };
    let deleteClaim = new ActionButton();
    deleteClaim.label = "Delete Marriage Info";
    deleteClaim.data = rowData;
    deleteClaim.action = (data => {
      // this.removeClaim(data);
    });
    menu.buttons.push(editAddressInfo, deleteClaim);
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
    this.marriageService.getMarriages(pg, pgS, this.searchedHusband, this.searchedWife, this.searchedMarriage).subscribe((data:any) => {
      this.pageSettings.setTotalRecords(data.count[0].count)
      console.log(data);
      this.data.next(data.data);
    })
  }

  search(){
    let pg = this.pageSettings.currentPage - 1;
    let pgS = this.pageSettings.pageSize;
    this.marriageService.getMarriages(pg, pgS, this.searchedHusband, this.searchedWife, this.searchedMarriage).subscribe((data:any) => {
      this.pageSettings.setTotalRecords(data.count[0].count)
      this.data.next(data.data);
    });
  }

}
