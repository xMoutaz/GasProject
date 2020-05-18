import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';

@NgModule({
  declarations: [
    Test1Component,
    Test2Component
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
          { path: 'test1', component: Test1Component},
          { path: 'test2', component: Test2Component},
        ])
],
  exports: [
    Test1Component,
    Test2Component
  ],
  providers: [
  ],
})
export class testPrivilegeModule { }
