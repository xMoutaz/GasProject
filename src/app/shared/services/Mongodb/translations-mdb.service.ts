import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Word } from '../../models/wordTrans';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Language } from '../../models/language';
import { NewWord } from '../../models/newWord';

@Injectable({
  providedIn: 'root'
})
export class TranslationsMdbService {
  
  readonly baseURL = 'https://gas-apiv0.herokuapp.com/translations';
  word : Word;
  translations: Word[];
  constructor(private http: HttpClient) { }

  saveWord(word): Observable<Word> {
    return this.http.post<Word>(this.baseURL + '/addNewWord/', word);
  }

  // http://localhost:3000/translations/dataTble/en?pg=0&&pgS=5
  getDataTableTranslations(lang, pg, pgS): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.baseURL}/dataTble/${lang}?pg=${pg}&&pgS=${pgS}`);
  }

  // Get how many translations languages
  getTranslationLanguages(): Observable<Language> {
    return this.http.get<Language>(this.baseURL +'/TranslationsLanguage');
  }

  getTotalRecord() {
    return this.http.get(`${this.baseURL}/dataTable/totalRecords`);
  }

  addNewLanguage(language: Language ) {
    return this.http.patch<Language>(this.baseURL + '/AddLanguage', language);
  }

  // // http://localhost:3000/translations/EditArabicTranslation/en?translationId=ARABIC
  updateTranslation( lang, word: NewWord): Observable<Word> {
    // console.log(_id);
    console.log(lang);
    console.log(word);    
    // http://localhost:3000/translations/EditTranslation/ar?translationId=DELETE
    return this.http.patch<Word>(`${this.baseURL}/EditTranslation/${lang}`, word);
  }

  deleteTranslation(_id) {
    return this.http.delete<void>(this.baseURL+ `/${_id}`)
   }

  }