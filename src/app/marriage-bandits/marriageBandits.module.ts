import { NgModule } from '@angular/core';
import { ClaimsComponent } from './components/claims/claims.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
  ClaimsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'claims', component: ClaimsComponent},
    ]),
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class MarriageBanditsModule { }

