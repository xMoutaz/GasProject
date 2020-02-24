import { Component, OnInit } from '@angular/core';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { Word } from 'src/app/shared/models/wordTrans';

@Component({
  selector: 'app-admin-add-new-language',
  templateUrl: './admin-add-new-language.component.html',
  styleUrls: ['./admin-add-new-language.component.css']
})
export class AdminAddNewLanguageComponent implements OnInit {
  word = new Word();
  language: string;

  constructor(private translationService: TranslationsService) { }

  ngOnInit() {
  }

  updateTranslations() {
    console.log(this.language);
    
    this.translationService.addNewLang(this.language, this.word);
  }
}
