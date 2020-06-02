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
  searchedProperty: any;
  pageSettings: PageSettings;

  constructor(private route: ActivatedRoute, private searchForSale: SearchForSaleService) { 
    this.setUpColumnDefintion();
    this.route.params.subscribe((data : any) => {
      this.searchedProperty = data;
      // this.searchedProperty.location = [data.location0, data.location1];
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
        key: 'city',
        className: `data_grid_left_align`,
        header: 'city',
      },
      {
        key: 'addressLine1',
        className: `data_grid_left_align`,
        header: 'addressLine1',
      },
      {
        key: 'addressLine2',
        className: 'data_grid_left_align',
        header: 'addressLine2',
      },
      {
        key: 'bedrooms',
        className: `data_grid_left_align`,
        header: 'bedrooms'
      },
      {
        key: 'added',
        className: `data_grid_left_align`,
        header: 'added',
      },
      {
        key: 'price',
        className: `data_grid_left_align`,
        header: 'Price',
        formatter: (data,type, row) => {
          return data + " " + ('DH')
        }
      }
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
        this.data.next(data);
      },
      err => {
        console.log(err)
      }
    );
  }

  
}
