import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';

@Component({
  selector: 'app-firebase-trans-loader',
  templateUrl: './firebase-trans-loader.component.html',
  styleUrls: ['./firebase-trans-loader.component.css']
})
export class FirebaseTransLoaderComponent implements TranslateLoader {

  constructor(private db: AngularFireDatabase) { }
 
 
 
  getTranslation(lang: string, prefix: string = 'translates'): Observable<any> {
    return this.db.object(`${prefix}/${lang}`).valueChanges();
  }
    

  ngOnInit() {
  }

}
