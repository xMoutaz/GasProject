import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { ProductsComponent } from './components/products/products.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AuthGuardService } from './services/auth-guard.service';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';

import { UserDetailsComponent } from './components/user-details/user-details.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';


const routes: Routes = [
  { path: '', component: HomeComponent},

  { path: 'login', component: LoginComponent},
  { path: 'signup', component: RegistrationComponent},
  { path: 'data-tables', component: DataTableComponent },


  { path : 'userDetails', component: UserDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuardService]}, // should be loged in
  { path:'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]}, // should be loged in 
  { path:'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]}, // should be loged in 

  { path: 'admin', component: AdminComponent}, // only admins can access
  { path: 'admin-user', component: AdminUsersComponent}, // only admins can access

  { path: 'no-access', component: NoAccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
