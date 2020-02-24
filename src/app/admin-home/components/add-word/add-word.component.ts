import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/wordTrans';
import { AdminDataService } from '../../services/admin-data.service';
import { Router } from '@angular/router';
import { TranslationsService } from 'src/app/shared/services/translations.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {
  word = new Word();
  selectedLanguage: string;

  constructor(
    private router: Router, 
    private adminUser: AdminDataService, 
    private translationService: TranslationsService) { 
      // getting the targeted Language
    this.adminUser.targetedLanguageObs.subscribe(lang => {
      this.selectedLanguage = lang;});
    }

  ngOnInit() {
  }

  addWord(word: Word) {
    this.translationService.updateArTrans(this.selectedLanguage , this.word);
    this.router.navigate(['admin/add-lang']);
  }
}
