import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/wordTrans';
import { AdminDataService } from '../../services/admin-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { TranslationsMdbService } from 'src/app/shared/services/Mongodb/translations-mdb.service';
import { NewWord } from 'src/app/shared/models/newWord';
import { Language } from 'src/app/shared/models/language';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {
  word = new Word();
  selectedLanguage: string;

  newWord: NewWord =<any>{};
  language= new Language();

  constructor(
    private translationServiceMdb : TranslationsMdbService,
    private route : ActivatedRoute,
    private router: Router) { 
       this.language.language = this.route.snapshot.paramMap.get('lang');
      console.log(this.route.snapshot.paramMap.get('lang'));
      this.getLanguages();
    }

  ngOnInit() {
  }

  getLanguages() {
   
    this.translationServiceMdb.getTranslationLanguages().subscribe((data: any) => {
       this.newWord.word={};
     data.forEach(data => {
     this.newWord['word'][data]=  '';
     console.log(data);
   });
   console.log(this.newWord);
   
  });
}

  addWord() {

    console.log(this.newWord);

    this.translationServiceMdb.saveWord(this.newWord)
    .subscribe(
      (data) => {
        console.log(data, `new Word (${this.newWord}) added`);
        this.updateTrans();
        });
      }

  updateTrans() {
    this.translationServiceMdb.updateTranslation(this.language.language, this.newWord).subscribe(data => {
      console.log(data)});
      this.router.navigate(['admin/add-lang']);
    }
}
