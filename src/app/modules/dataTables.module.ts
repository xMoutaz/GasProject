import { NgModule } from '@angular/core';
import {MatCheckboxModule} from '@angular/material';
import { DataTableComponent } from '../components/data-table/data-table.component';


@NgModule({
  declarations: [DataTableComponent],
  exports:[
    DataTableComponent, MatCheckboxModule
  ]
})
export class DataTableModule { }
