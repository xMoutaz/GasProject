import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewWord } from '../models/newWord';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  private wordLanguages = new BehaviorSubject<NewWord>(<any>{});
  wordLanguagesOBS = this.wordLanguages.asObservable();
  constructor() { }

  changeWord(newWord: NewWord) {
    this.wordLanguages.next(newWord);
  }
}
