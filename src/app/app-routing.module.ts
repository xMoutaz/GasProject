import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { AdminComponent } from './admin-home/components/admin/admin.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';
import { NoAccessComponent } from './shared/components/no-access/no-access.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { CheckOutComponent } from './shared/components/check-out/check-out.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { OrderSuccessComponent } from './shared/components/order-success/order-success.component';

import { UserDetailsComponent } from './admin-home/components/user-details/user-details.component';
import { AdminUsersComponent } from './admin-home/components/admin-users/admin-users.component';
import { AdminAddLanguageComponent } from './admin-home/components/admin-add-language/admin-add-language.component';
import { EditWordComponent } from './admin-home/components/edit-word/edit-word.component';
// import { AdminHomeModule } from './admin-home/admin-home.module';


const routes: Routes = [
  { path: '', component: HomeComponent}
  // { path: 'login', component: LoginComponent},
  // { path: 'signup', component: RegistrationComponent},

  // { path: 'products', component: ProductsComponent, canActivate: [AuthGuardService]}, // should be loged in
  // { path:'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]}, // should be loged in 
  // { path:'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]}, // should be loged in 
  
  // { path: 'admin-home', children:
  // [
  //   { path: 'admin', component: AdminComponent}, // only admins can access
  //   { path: 'admin-user', component: AdminUsersComponent}, // only admins can access
  //   { path:'edit-language', component: EditWordComponent},
  //   { path : 'userDetails', component: UserDetailsComponent, canActivate: [AuthGuardService] }, // should be loged in
  // ] 
// },
  // { path: 'admin-home', loadChildren: './admin-home.module#adminModule'},
  // { path:'add-lang', component: AdminAddLanguageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
