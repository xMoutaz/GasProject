import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataTableComponent } from '../components/controls/data-table/data-table.component';


@NgModule({
  declarations: [DataTableComponent],
  exports:[
    DataTableComponent, MatCheckboxModule
  ]
})
export class DataTableModule { }
