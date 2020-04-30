import { NgModule } from '@angular/core';
import { MakeClaimComponent } from './components/makeClaim/claims.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MarriageBanditService } from './services/marriageBandits.service';
import { ViewClaimsComponent } from './components/view-claims/view-claims.component';
import { ViewOffendersComponent } from './components/view-offenders/view-offenders.component';
import { ClaimViewComponent } from './components/claim-view/claim-view.component';
import { PrivilegeComponent } from './components/privilege/privilege.component';

@NgModule({
  declarations: [
  MakeClaimComponent,
  ViewClaimsComponent,
  ViewOffendersComponent,
  PrivilegeComponent,
  ClaimViewComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'makeClaim', component: MakeClaimComponent},
      { path: 'viewClaims', component: ViewClaimsComponent},
      { path: 'viewOffenders', component: ViewOffendersComponent},
      { path: 'claimView/:id', component: ClaimViewComponent},
      { path: 'privileges', component: PrivilegeComponent}
    ]),
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MarriageBanditService
  ]
})
export class MarriageBanditsModule { }

