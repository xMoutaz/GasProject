import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchPropertiesForSaleComponent } from './components/search-properties-for-sale/search-properties-for-sale.component';
import { ViewForSalePropertiesComponent } from './components/view-for-sale-properties/view-for-sale-properties.component';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { SearchPropertiesForRentComponent } from './components/search-properties-for-rent/search-properties-for-rent.component';



@NgModule({
  declarations: [
    SearchPropertiesForSaleComponent,
    ViewForSalePropertiesComponent,
    SearchPropertiesForRentComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'searchPropertiesForSale', component: SearchPropertiesForSaleComponent},
      { path: 'searchPropertiesForRent', component: SearchPropertiesForRentComponent},
      { path: 'view-for-sale', component: ViewForSalePropertiesComponent},
    ])
  ],
  exports: [
    SearchPropertiesForSaleComponent,
    ViewForSalePropertiesComponent
  ],
})
export class MooplaModule { }
