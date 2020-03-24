import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { environment } from 'src/environments/environment';

// import { AdminHomeModule } from './admin-home/admin-home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FirebaseTransLoaderComponent } from './shared/firebase-trans-loader/firebase-trans-loader.component';
import { SharedModule } from './shared/shared.module';
import { AdminHomeModule } from './admin-home/admin-home.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from 'src/lib/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LoaderService, LoaderInterceptor } from './shared/services/loader.service';
import { LoaderComponent } from './components/helpers/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageService } from './shared/services/message.service';
import { ErrorIntercept } from './shared/services/error.interceptor';
import { environment } from 'src/environments/environment.prod';
import { MessageComponent } from './components/controls/message/message.component';
import { GpfiModalComponent } from './components/controls/gpfi-modal/gpfi-modal.component';
import { OverlayComponent } from './components/controls/overlay/overlay.component';
import { ConfirmationBoxComponent } from './components/controls/confirmation-box/confirmation-box.component';
import { AppDropdownComponent } from './components/controls/dropdown/app.dropdown.component';
import { ActionMenuComponent } from './components/controls/action-menu/action-menu.component';
import { OperationButtonsComponent } from './components/controls/operation-buttons/operation-buttons.component';
// import { AppDropdownComponent } from './components/data-table/dropdown/app.dropdown.component';

// export function FbTransLoaderFactory(db: AngularFireDatabase) {
//   return new FirebaseTransLoaderComponent(db);
// }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    MessageComponent,
    // AppDropdownComponent
    // FirebaseTransLoaderComponent,
    GpfiModalComponent,
    ActionMenuComponent,
    OverlayComponent,
    ConfirmationBoxComponent,
    AppDropdownComponent,
    OperationButtonsComponent
    ],
  imports: [
    // TranslateModule.forRoot({
    //   loader: {
    //       provide: TranslateLoader,
    //       useFactory: HttpLoaderFactory,
    //       deps: [HttpClient]
    //   }
    // }),
    SharedModule,
    AdminHomeModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
      MatProgressSpinnerModule,
      MatDialogModule    
  ],
  providers: 
  [MessageService, ErrorIntercept, 
    {
    provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
  },
    LoaderService, LoaderInterceptor,
    { provide: HTTP_INTERCEPTORS, 
      useClass: LoaderInterceptor, 
      multi: true }
    ],
  bootstrap: [AppComponent],
  entryComponents: [ActionMenuComponent]
})
export class AppModule { }
