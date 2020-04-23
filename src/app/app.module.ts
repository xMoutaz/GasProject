import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { TranslateHttpLoader } from 'src/lib/http-loader';
import { AdminHomeModule } from './admin-home/admin-home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageReducer, SelelectLanguageReducer, UserReducer } from './reducers/language.reducers';
import { ErrorIntercept } from './shared/services/error.interceptor';
import { LoaderInterceptor, LoaderService } from './shared/services/loader.service';
import { MessageService } from './shared/services/message.service';
import { SharedModule } from './shared/shared.module';
import { LanguageEffects } from 'src/app/state/language.effects';
import { ActionMenuComponent } from 'src/app/components/controls/action-menu/action-menu.component';
import { ConfirmationBoxComponent } from 'src/app/components/controls/confirmation-box/confirmation-box.component';
import { GpfiModalComponent } from 'src/app/components/controls/gpfi-modal/gpfi-modal.component';
import { MessageComponent } from 'src/app/components/controls/message/message.component';
import { OperationButtonsComponent } from 'src/app/components/controls/operation-buttons/operation-buttons.component';
import { OverlayComponent } from 'src/app/components/controls/overlay/overlay.component';
import { LoaderComponent } from 'src/app/components/helpers/loader/loader.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    MessageComponent,
    // FirebaseTransLoaderComponent,
    GpfiModalComponent,
    ActionMenuComponent,
    OverlayComponent,
    ConfirmationBoxComponent,
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
      routerReducer: routerReducer,
      User: UserReducer
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
