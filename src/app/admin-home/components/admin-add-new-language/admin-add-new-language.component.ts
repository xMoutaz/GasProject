import { Component, OnInit } from '@angular/core';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { Word } from 'src/app/shared/models/wordTrans';
import { TranslationsMdbService } from 'src/app/shared/services/Mongodb/translations-mdb.service';
import { Language } from 'src/app/shared/models/language';
import { Router } from '@angular/router';
import { NewWord } from 'src/app/shared/models/newWord';

@Component({
  selector: 'app-admin-add-new-language',
  templateUrl: './admin-add-new-language.component.html',
  styleUrls: ['./admin-add-new-language.component.css']
})
export class AdminAddNewLanguageComponent implements OnInit {
  word = new Word();

  language = new Language();
  languages : Language[];

  newWord: NewWord =<any>{};

  data = {
    id : this.word.word,
    // word : this.word.word,
    trans:this.word.trans
  }
  constructor(
    private router : Router,
    private translationsMdbService: TranslationsMdbService,
    private translationService: TranslationsService) {
      this.getLanguages();
    }

  ngOnInit() {
  }

  addNewKaLanguage() {
    // this.word.id = this.word.word.toUpperCase();

    // this.data.id = this.word.word;
    // this.data.trans = this.word.trans;

    // console.log('word.id = '+this.word.id);
    // console.log(this.language);

    // this.translationsMdbService.addNewLanguage(this.language).subscribe(
    //   (data) => {
    //     console.log(data, `new Language (${this.language}) added`)
    //     this.addWord();},
    //   (error) => console.log(error));

    // this.translationsMdbService.saveWord(this.language, this.word)

    this.newWord.id = this.newWord.id.toUpperCase();
    console.log(this.newWord);
    
    this.translationsMdbService.addNewLanguage(this.language).subscribe(
      (data) => {
        console.log(data, `new Language (${this.language}) added`);
        this.addWord();
      });
  }

   getLanguages() {
   
    this.translationsMdbService.getTranslationLanguages().subscribe((data: any) => {
       this.newWord.word={};
   // this.language = data;
   data.forEach(data => {
     this.newWord['word'][data]= data;
     console.log(data);
   });
   console.log(this.newWord);
   
  });

    // this.translationsMdbService.getTranslationLanguages().subscribe((data: any) => {
    //        this.data['word']={};
    //     // this.language = data;
    //     data.forEach(data => {
    //       this.data['word'][data]= data;
    //       console.log(data);
    //     });
    //   });
        // console.log(this.data);

      // this.word = '';

  }

  addWord() {

    console.log(this.newWord);

    this.translationsMdbService.saveWord(this.newWord)
    .subscribe(
      (data) => {
        console.log(data, `new Word (${this.newWord}) added`);
        this.updateTrans();
        });

    // this.translationsMdbService.saveWord(this.data)
    // .subscribe(
    //   (data) => {
    //     console.log(data, `new Word (${this.data}) added`)
    //     },
    //   (error) => console.log(error));

    // this.router.navigate(['admin/add-lang']);
  }

  updateTrans() {
    this.translationsMdbService.updateTranslation(this.language.language, this.newWord).subscribe(data => {
      console.log(data)});
      this.router.navigate(['admin/add-lang']);
    }
  //   this.translationService
  //   .updateArTrans(this.language.language , this.word).subscribe(
  //     (data) => {
  //       console.log(data, `new Word (${this.word}) added`)
  //       this.addWord();},
  //     (error) => console.log(error));
  // }
}
