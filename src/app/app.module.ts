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
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AdminHomeModule } from './admin-home/admin-home.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from 'src/lib/http-loader';
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
import { StoreModule } from "@ngrx/store";
import {  LanguageReducer, 
          SelelectLanguageReducer, 
           } from './reducers/language.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LanguageEffects } from './state/language.effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

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
    SharedModule,
    AdminHomeModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      selectLang: SelelectLanguageReducer,
      language: LanguageReducer,
      routerReducer: routerReducer
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([LanguageEffects]),
    StoreRouterConnectingModule,

    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    MatProgressSpinnerModule,
    MatDialogModule    
  ],
  providers: 
  [ 
    MessageService, ErrorIntercept, 
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
