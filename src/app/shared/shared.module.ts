import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { ProductsComponent } from './components/products/products.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
// import { FirebaseTransLoaderComponent } from './firebase-trans-loader/firebase-trans-loader.component';
import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule } from '../modules/dataTables.module';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserMdbService } from './services/Mongodb/user-mdb.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from 'src/lib/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ActionMenuComponent } from '../components/controls/action-menu/action-menu.component';

// export function FbTransLoaderFactory(db: AngularFireDatabase) {
//   return new FirebaseTransLoaderComponent(db);
// }
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
 
    ]),
    // TranslateModule.forRoot({
    //   loader: 
    // {provide: TranslateLoader, 
    // useFactory:FbTransLoaderFactory, 
    //deps: [AngularFireDatabase]}
    // })
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

