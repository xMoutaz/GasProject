import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { FormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { OrderService } from './services/order.service';
import { AuthService } from './services/auth.service';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { environment } from 'src/environments/environment';
import { UserService } from './services/user.service';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { DataTableComponent } from './components/data-table/data-table.component';

import { DataTablesModule } from 'angular-datatables';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';

import {MatDialogModule} from '@angular/material/dialog';
// import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    BsNavbarComponent,
    NoAccessComponent,
    NotFoundComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    UserDetailsComponent,
    DataTableComponent,
    ActionMenuComponent,
    AdminUsersComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgbModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatDialogModule
    // AgmCoreModule.forRoot({
    //   apiKey:'AIzaSyAgOOKZJW7QHornw3GO03_Ugw91IZIPVxc'
    // })
  ],
  providers: [
    OrderService,
    AuthService,
    UserService,
    AuthGuardService,
    AdminAuthGuardService

  ],
  bootstrap: [AppComponent],
  entryComponents: [AdminUsersComponent]
})
export class AppModule { }
