import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColumnDefs } from 'src/app/components/controls/data-table/classes/Columns';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { filter } from 'rxjs/operators';
import { SearchedProperty } from '../../models/for-sale';
import { PageSettings } from 'src/app/components/controls/data-table/classes/Paging';
import { SearchForSaleService } from '../../services/search-for-sale.service';

@Component({
  selector: 'app-view-for-sale-properties',
  templateUrl: './view-for-sale-properties.component.html',
  styleUrls: ['./view-for-sale-properties.component.css']
})
export class ViewForSalePropertiesComponent implements OnInit {

  data = new BehaviorSubject<Array<any>>([]);
  colDefinitions: Array<ColumnDefs>;
  orderObj: any;
  searchedProperty = {} as SearchedProperty;
  pageSettings: PageSettings;
  
  constructor(private route: ActivatedRoute, private searchForSale: SearchForSaleService) { 
    this.setUpColumnDefintion();
    this.route.params.subscribe((data : any) => {
      this.searchedProperty = data;
    })
  }

  ngOnInit(): void {
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

    ];
  }

  setUppageSettings() {
    this.pageSettings = new PageSettings(() => {
      this.onPageChange();
    });
  }
  
  onPageChange() {
    this.searchForSale.searchPropertiesForSale(this.searchedProperty).subscribe(
      (data: any) => {
        this.data.next(data.data);
      },
      err => {
        console.log(err)
      }
    );
  }

  
}
