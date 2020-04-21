import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './components/admin/admin.component';
import { AdminAddLanguageComponent } from './components/admin-add-language/admin-add-language.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { EditWordComponent } from './components/edit-word/edit-word.component';
import { NavpillComponent } from './components/navpill/navpill.component';
import { UserDetailsComponent } from '../shared/components/user-details/user-details.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AdminHomeComponent } from './admin-home.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { AdminAddNewLanguageComponent } from './components/admin-add-new-language/admin-add-new-language.component';
import { AddWordComponent } from './components/add-word/add-word.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminAddLanguageComponent,
    AdminUsersComponent,
    EditWordComponent,
    NavpillComponent,
    UserDetailsComponent,
    AdminHomeComponent,
    AdminAddNewLanguageComponent,
    AddWordComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    
    RouterModule.forRoot([
      { 
        path: 'admin', 
        component:AdminHomeComponent,
        canActivate: [AdminAuthGuardService],
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'users'
          },
          { path: 'users', component: AdminComponent},
          { path: 'adminAddnewLanguage', component: AdminAddNewLanguageComponent},
          { path: 'admin-user/:id', component: AdminUsersComponent},
          { path:'edit-language', component: EditWordComponent},
          { path:'add-lang', component: AdminAddLanguageComponent},
          { path:'add-word/:lang', component: AddWordComponent}
        ]
    }
    ])
  ],
  exports: [
    AdminComponent,
    AdminAddLanguageComponent,
    AdminUsersComponent,
    EditWordComponent,
    NavpillComponent,
    UserDetailsComponent
  ],
  providers: [
    AdminAuthGuardService,
    AuthGuardService
  ],
  entryComponents: [AdminUsersComponent, AdminAddLanguageComponent]
})
export class AdminHomeModule { }
