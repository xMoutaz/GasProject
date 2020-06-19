import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { BehaviorSubject } from 'rxjs';

export class TranslateHttpLoader implements TranslateLoader {
  readonly translations$ = new BehaviorSubject<any>(null);

  readonly baseUrl = 'https://gas-apiv0.herokuapp.com/translations/ngx-translate'
  constructor(private http: HttpClient) { }
  getTranslation(lang: string) {
   return this.http.get(`${this.baseUrl}/${lang}`);
  
}
    

}