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
import { environment } from 'src/environments/environment';

// import { AdminHomeModule } from './admin-home/admin-home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { FirebaseTransLoaderComponent } from './shared/firebase-trans-loader/firebase-trans-loader.component';
import { SharedModule } from './shared/shared.module';
import { AdminHomeModule } from './admin-home/admin-home.module';
import { HttpClientModule } from '@angular/common/http';

// export function FbTransLoaderFactory(db: AngularFireDatabase) {
//   return new FirebaseTransLoaderComponent(db);
// }

@NgModule({
  declarations: [
    AppComponent,
    ActionMenuComponent,
    FirebaseTransLoaderComponent,
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
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [ ActionMenuComponent]
})
export class AppModule { }
