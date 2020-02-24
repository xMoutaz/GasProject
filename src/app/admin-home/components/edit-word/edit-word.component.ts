import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AdminDataService } from '../../services/admin-data.service';
import { throwIfEmpty, map, take } from 'rxjs/operators';
import { Word } from 'src/app/shared/models/wordTrans';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit {
  wordkey: string;
  wordTrans: string;
  word = new Word();
  selectedLanguage: string;
  totalRecords: number;
  @Output() notify: EventEmitter<any> = new EventEmitter();

  private _url: string ='https://us-central1-gasproject-2f4cb.cloudfunctions.net/webApi/api/v1/test';

  constructor(
    private http: HttpClient,
    private router: Router, 
    private adminUser: AdminDataService, 
    private translationService: TranslationsService) { 
    

    // getting the targeted Language
    this.adminUser.targetedLanguageObs.subscribe(lang => {
      this.selectedLanguage = lang;});

    // getting the targeted word 
    this.adminUser.targetedWordKeyObs.subscribe(key => {
      this.word.word = key;
      if(key) {
      this.getWord(key);
      }
      else return null;
    });
  }

  getWord(key: string) {
    return this.translationService.getWordTrans(this.selectedLanguage, key)
    .valueChanges().pipe(take(1)).subscribe((data) => {
      console.log(data);
      let temp : any = data;
      this.word.trans = temp;
    });
  }

  updateTranslations() {
    this.notify.emit();
  }

  ngOnInit() {
  }
  

}
