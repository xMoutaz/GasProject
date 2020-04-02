import { Component, OnInit } from '@angular/core';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { Word } from 'src/app/shared/models/wordTrans';
import { TranslationsMdbService } from 'src/app/shared/services/Mongodb/translations-mdb.service';
import { Language } from 'src/app/shared/models/language';
import { Router } from '@angular/router';
import { NewWord } from 'src/app/shared/models/newWord';
import { concatMap } from 'rxjs/operators';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-add-new-language',
  templateUrl: './admin-add-new-language.component.html',
  styleUrls: ['./admin-add-new-language.component.css']
})
export class AdminAddNewLanguageComponent implements OnInit {

  language = new Language();

  newWord: NewWord =<any>{};

  subscription: Subscription;
  constructor(
    private wordLang: LanguagesService,
    private router : Router,
    private translationsMdbService: TranslationsMdbService,
    ) {
  }

    ngOnInit() {
      this.subscription= this.wordLang.wordLanguagesOBS.subscribe((newWord: NewWord) => this.newWord = newWord);
       console.log(this.newWord);
     }
   
     ngOnDestroy(): void {
       this.subscription.unsubscribe();
     }

  addNewKaLanguage() {
      console.log(this.newWord);
      // add language => add the new word => update the word 
      this.translationsMdbService.addNewLanguage(this.language).pipe(
          concatMap(ok => this.translationsMdbService.saveWord(this.newWord))
      ).subscribe(
        (word: NewWord) => { console.log(word); this.router.navigate(['admin/add-lang']);},
        err => { console.log(err); }
      );
  }
}
