import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word } from 'src/app/shared/models/wordTrans';
import { AdminDataService } from '../../services/admin-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { TranslationsMdbService } from 'src/app/shared/services/Mongodb/translations-mdb.service';
import { NewWord } from 'src/app/shared/models/newWord';
import { Language } from 'src/app/shared/models/language';
import { concatMap } from 'rxjs/operators';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit, OnDestroy{

  newWord: NewWord =<any>{};
  
  language= new Language();

  subscription: Subscription;

  constructor(
    private wordLang: LanguagesService,
    private translationServiceMdb : TranslationsMdbService,
    private route : ActivatedRoute,
    private router: Router) { 
       this.language.language = this.route.snapshot.paramMap.get('lang');
      console.log(this.route.snapshot.paramMap.get('lang'));
    }
  

  ngOnInit() {
   this.subscription= this.wordLang.wordLanguagesOBS.subscribe((newWord: NewWord) => this.newWord = newWord);
    console.log(this.newWord);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addWord() {
    this.translationServiceMdb.saveWord(this.newWord).subscribe(
          (word: NewWord) => { console.log(word); this.router.navigate(['admin/add-lang']);},
          err => { console.log(err); }
        );
  }

  
}
