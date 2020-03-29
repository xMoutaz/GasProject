import {HttpClient} from "@angular/common/http";
import {TranslateLoader} from "@ngx-translate/core";
import {Observable, BehaviorSubject} from 'rxjs';
import { TranslationsMdbService } from 'src/app/shared/services/Mongodb/translations-mdb.service';
import { take, filter } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

export class TranslateHttpLoader implements TranslateLoader {
  readonly translations$ = new BehaviorSubject<any>(null);

  readonly baseUrl = 'https://gas-apiv0.herokuapp.com/translations/ngx-translate'
  constructor(private http: HttpClient) { }
  getTranslation(lang: string) {
   return this.http.get(`${this.baseUrl}/${lang}`);
  
}
    

}