import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from 'src/lib/http-loader';
import { ActionMenuComponent } from '../components/controls/action-menu/action-menu.component';
import { DataTableModule } from '../modules/dataTables.module';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserMdbService } from './services/Mongodb/user-mdb.service';
import { UserService } from './services/user.service';
import { UnregisterationComponent } from './components/unregisteration/unregisteration.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    BsNavbarComponent,    
    RegistrationComponent,
    NoAccessComponent,
    NotFoundComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    UserSettingsComponent,
    ForgetPasswordComponent,
    UnregisterationComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    RouterModule.forChild([
      { path: 'login', component: LoginComponent},
      { path: 'signup', component: RegistrationComponent},
      { path: 'no-access', component: NoAccessComponent},
      { path: 'products', component: ProductsComponent, canActivate: [AuthGuardService]}, // should be loged in
      { path:'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]}, // should be loged in 
      { path:'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]}, // should be loged in    
      { path : 'userDetails', component: UserDetailsComponent, canActivate: [AuthGuardService] }, // should be loged in
      { path : 'userSetting', component: UserSettingsComponent, canActivate: [AuthGuardService] }, // should be loged in
      { path : 'forgetPassword', component: ForgetPasswordComponent }, // should be loged in
      { path : 'unRegister', component: UnregisterationComponent }, // should be loged in
 
    ]),
  ],
  exports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HomeComponent,
    DataTableModule,
    LoginComponent,
    BsNavbarComponent,    
    RegistrationComponent,
    NoAccessComponent,
    NotFoundComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    TranslateModule,
    RouterModule
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuardService,
    UserMdbService
  ],
  entryComponents: [ ActionMenuComponent]
})
export class SharedModule { }

