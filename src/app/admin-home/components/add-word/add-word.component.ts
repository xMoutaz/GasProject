import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { take } from 'rxjs/operators';
import { Language } from 'src/app/shared/models/language';
import { NewWord } from 'src/app/shared/models/newWord';
import { TranslationsMdbService } from 'src/app/shared/services/Mongodb/translations-mdb.service';
import { AppState } from 'src/app/state/models/app-state-models';
import { Word } from 'src/app/shared/models/wordTrans';
import { nullSafeIsEquivalent, isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {
  newWord = new NewWord();
  language = new Language();
  languages$: Observable<Array<any>>;
  word  = new Word();

  constructor(private store: Store<AppState>, private translationServiceMdb: TranslationsMdbService, 
    private _location: Location, private router: Router) {
    this.store.select(store => store).pipe(take(1))
      .subscribe(state => {
        this.language.language = state.routerReducer.state.root.firstChild.firstChild.params.lang;
      });
  }

  ngOnInit() {
     this.newWord.word = {};
    this.languages$ = this.store.select(store => store.language.list);
      this.store.select(store => store.language.list)
      .subscribe((data: any) => {
        this.languages$ = data;
        data.forEach(data => {
          this.newWord['word'][data]= null;
        });
      });
  }

  addWord() {
    this.translationServiceMdb.saveWord(this.newWord).subscribe(
      (word: NewWord) => { 
        this.router.navigate(['admin/add-lang']);
       },
      err => { console.log(err); }
    );
  }

  backButton() {
    this._location.back();
  }

}
