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
import { RoleGaurdService } from '../shared/services/auth-guard.service';
import { ClaimConfirmationComponent } from './components/claim-confirmation/claim-confirmation.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClaimMenuComponent } from './components/claim-menu/claim-menu.component';
import {MatBadgeModule} from '@angular/material/badge';
import { OffenderViewComponent } from './offender-view/offender-view.component';
import { RegisterMarriageComponent } from './components/register-marriage/register-marriage.component';
import { ViewMarriagesComponent } from './components/view-marriages/view-marriages.component';
import { MarriageViewComponent } from './components/marriage-view/marriage-view.component';

@NgModule({
  declarations: [
  MakeClaimComponent,
  ViewClaimsComponent,
  ViewOffendersComponent,
  PrivilegeComponent,
  ClaimViewComponent,
  ClaimConfirmationComponent,
  ClaimMenuComponent,
  OffenderViewComponent,
  RegisterMarriageComponent,
  ViewMarriagesComponent,
  MarriageViewComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'makeClaim', component: MakeClaimComponent},
      { path: 'registerMarriage', component: RegisterMarriageComponent},
      { path: 'viewMarriages', component: ViewMarriagesComponent},
      { path: 'marriageView/:id', component: MarriageViewComponent},
      { path: 'viewClaims', component: ViewClaimsComponent, canActivate: [RoleGaurdService], data: {roles: ['Verifier']}},
      { path: 'viewOffenders', component: ViewOffendersComponent, canActivate: [RoleGaurdService], data: {roles: ['Masjid']}},
      { path: 'claimView/:id', component: ClaimViewComponent, canActivate: [RoleGaurdService], data: {roles: ['Verifier']}},
      { path: 'claimConfirmation', component: ClaimConfirmationComponent},
      { path:  'offenderView/:id', component:OffenderViewComponent}
    ]),
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatBadgeModule
  ],
  exports: [
    RouterModule,
    ClaimMenuComponent
  ],
  providers: [
    MarriageBanditService
  ]
})
export class MarriageBanditsModule { }
