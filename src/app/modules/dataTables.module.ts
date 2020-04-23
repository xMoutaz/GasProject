import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataTableComponent } from 'src/app/components/controls/data-table/data-table.component';
@NgModule({
  declarations: [DataTableComponent],
  exports:[
    DataTableComponent, MatCheckboxModule
  ]
})
export class DataTableModule { }
