import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchPropertiesForSaleComponent } from './components/search-properties-for-sale/search-properties-for-sale.component';
import { ViewForSalePropertiesComponent } from './components/view-for-sale-properties/view-for-sale-properties.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ViewForSalePropertiesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'searchPropertiesForSale', component: SearchPropertiesForSaleComponent},
      { path: 'view-for-sale', component: ViewForSalePropertiesComponent},
    ])
  ]
})
export class MooplaModule { }
