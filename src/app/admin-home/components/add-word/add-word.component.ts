import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslationsMdbService } from 'src/app/shared/services/Mongodb/translations-mdb.service';
import { NewWord } from 'src/app/shared/models/newWord';
import { Language } from 'src/app/shared/models/language';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import {  Observable } from 'rxjs';
import { AppState } from 'src/app/state/models/app-state-models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {
  newWord: NewWord = <any>{};
  language = new Language();
  languages$: Observable<Array<any>>;
  
  constructor(
    private store: Store<AppState>, private translationServiceMdb: TranslationsMdbService, private route: ActivatedRoute, private router: Router) {
    this.store.select(store => store)
      .subscribe(state => {
        this.language.language = state.routerReducer.state.root.firstChild.firstChild.params.lang;
        console.log(this.language);
      });
  }

  ngOnInit() {
    this.newWord.word = {};
    this.languages$ = this.store.select(store => store.language.list);
    this.store.select(store => store.language.list)
      .subscribe((data: any) => {
        this.languages$ = data;
        data.forEach(data => {
          this.newWord['word'][data] = ''
        });
      });
  }

  addWord() {
    this.translationServiceMdb.saveWord(this.newWord).subscribe(
      (word: NewWord) => { console.log(word); this.router.navigate(['admin/add-lang']); },
      err => { console.log(err); }
    );
  }


}
