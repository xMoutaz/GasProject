import { Component, OnInit } from '@angular/core';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { Word } from 'src/app/shared/models/wordTrans';
import { TranslationsMdbService } from 'src/app/shared/services/Mongodb/translations-mdb.service';
import { Language } from 'src/app/shared/models/language';
import { Router } from '@angular/router';
import { NewWord } from 'src/app/shared/models/newWord';
import { concatMap } from 'rxjs/operators';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/models/app-state-models';
import { AddLanguage } from 'src/app/state/language.actions';
import { SelectLanguage } from 'src/app/state/select-language.actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-add-new-language',
  templateUrl: './admin-add-new-language.component.html',
  styleUrls: ['./admin-add-new-language.component.css']
})
export class AdminAddNewLanguageComponent implements OnInit {

  language = new Language();

  constructor(private store: Store<AppState>, private _location: Location) {
  }

  ngOnInit() {
  }

  addNewKaLanguage() {
    this.store.dispatch(new SelectLanguage(this.language));
    this.store.dispatch(new AddLanguage(this.language));
  }

  backButton() {
    this._location.back();
  }
}
