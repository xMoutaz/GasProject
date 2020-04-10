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
import { Subscription, Observable } from 'rxjs';
import { AppState } from 'src/app/state/models/app-state-models';
import { Store } from '@ngrx/store';
import { LoadLanguagesSuccess } from 'src/app/state/language.actions';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit, OnDestroy{

  newWord: NewWord =<any>{};
  
  language= new Language();

  languages$: Observable<Array<any>>;

  constructor(
    private store: Store<AppState>,
    private wordLang: LanguagesService,
    private translationServiceMdb : TranslationsMdbService,
    private route : ActivatedRoute,
    private router: Router) { 
       this.store.select(store => store)
        .subscribe(state => { 
          this.language.language = state.routerReducer.state.root.firstChild.firstChild.params.lang;
          console.log(this.language);
        });

      //  this.language.language = this.route.snapshot.paramMap.get('lang');
      //  console.log(this.route.snapshot.paramMap.get('lang'));
    }
  
  ngOnInit() {
    


    this.newWord.word={};

    this.languages$ = this.store.select(store => store.language.list);
    this.store.select(store => store.language.list)
    .subscribe((data: any) => {
      this.languages$ = data;
      data.forEach(data => {
       this.newWord['word'][data]=  ''});
    });

  //  this.subscription= this.wordLang.wordLanguagesOBS.subscribe((newWord: NewWord) => this.newWord = newWord);
    // console.log(this.languages$);
    
  }

  ngOnDestroy(): void {
  }

  addWord() {
    this.translationServiceMdb.saveWord(this.newWord).subscribe(
          (word: NewWord) => { console.log(word); this.router.navigate(['admin/add-lang']);},
          err => { console.log(err); }
        );
  }

  
}
