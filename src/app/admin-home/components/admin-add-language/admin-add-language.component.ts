import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ColumnDefs } from '../../../components/controls/data-table/classes/Columns';
import { ActionMenuComponent, ActionButton } from '../../../components/controls/action-menu/action-menu.component';
import { Router } from '@angular/router';
import { Word } from 'src/app/shared/models/wordTrans';
import { TranslationsMdbService } from 'src/app/shared/services/Mongodb/translations-mdb.service';
import { NewWord } from 'src/app/shared/models/newWord';
import { ExpansionSettings } from 'src/app/components/controls/data-table/classes/Expansion';
import { PageSettings, PagingHelper } from 'src/app/components/controls/data-table/classes/Paging';
import { GeneralSettings } from 'src/app/components/controls/data-table/classes/General';
import { EditWordComponent } from '../edit-word/edit-word.component';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { Language } from 'src/app/shared/models/language';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/models/app-state-models';
import { SelectLanguage } from 'src/app/state/select-language.actions';
import { LoadLanguages } from 'src/app/state/language.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-add-language',
  templateUrl: './admin-add-language.component.html',
  styleUrls: ['./admin-add-language.component.css']
})
export class AdminAddLanguageComponent implements OnInit, OnDestroy {

  data = new BehaviorSubject<Array<any>>([]);
  colDefinitions: Array<ColumnDefs>;
  selectedLanguage: any;
  dataList: any;
  totalRecords: number;
  languages$: Observable<Array<any>>;
  languageExpansionSettings: ExpansionSettings;
  pageSettings: PageSettings;
  generalSettings = new GeneralSettings();
  newWord: NewWord = <any>{};
  selectedProject: any;
  searchedWord = new Word();

  constructor(
    private store: Store<AppState>, private wordLang: LanguagesService, private translationsMDBService: TranslationsMdbService,
    public CFR: ComponentFactoryResolver, private router: Router) {

    this.getTotalRecord();
    this.setUpColumnDefintion();
    this.languageExpansionSettings = this.setupExpansionSettings();
    this.setUppageSettings();
    this.languages$ = this.store.select(store => store.language.list);
    this.store.select(store => store.language.error);
    this.store.dispatch(new LoadLanguages());
    this.store.select(store => store.selectLang.selectedLang)
      .subscribe(data => this.selectedLanguage = data);
    this.searchedWord.id = "";
    this.searchedWord.word = "";
  }

  ngOnInit() {
    if (this.selectedLanguage.language) {
      this.selectedProject = this.selectedLanguage.language;
      this.onPageChange();
    }
  }

  ngOnDestroy() {
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key: 'id',
        className: 'data_grid_left_align',
        header: "Word",
        responsivePriority: true
      },
      {
        key: 'trans',
        className: 'data_grid_center_align',
        header: "trans",
        responsivePriority: true
      },
      {
        cellElement: (cellData, rowData, row) => {
          return this.generateActionMenuForRfr(cellData, rowData, row);
        }, className: 'data_grid_center_align', responsivePriority: true
      }
    ];
  }

  getTotalRecord() {
    this.translationsMDBService.getTotalRecord().subscribe((data: number) => {
      this.totalRecords = data;
      this.pageSettings.setTotalRecords(this.totalRecords);
    })
  }

  generateActionMenuForRfr(cellData, rowData, row) {
    let menu = new ActionMenuComponent();

    let deleteButton = new ActionButton();
    deleteButton.label = "delete";
    deleteButton.data = rowData;
    deleteButton.action = (data => {
      // {id: "ENGLISH", word: "الانجليزية"}
      this.deleteTranslation(data.id)
    });
    let editLanguage = new ActionButton();
    editLanguage.label = "editLanguage";
    editLanguage.data = rowData;
    editLanguage.action = (data => {
      this.languageExpansionSettings.ExpandGrid({ id: rowData.id, propertyName: "id" })
    });
    menu.buttons.push(deleteButton, editLanguage);
    return menu;
  };

  setupExpansionSettings() {
    return new ExpansionSettings(false, (viewContainerRef, rowData, row) => {
      return new Promise<any>((resolve) => {
        const componentResolve =
          this.CFR.resolveComponentFactory(EditWordComponent);
        let component = viewContainerRef.createComponent(componentResolve);
        component.instance.newWord = rowData;
        this.newWord = component.instance.newWord;
        component.instance.notify.subscribe(event => {
          rowData.id = this.newWord.id;
          rowData.word = this.newWord.trans;

          this.translationsMDBService.updateTranslation(this.selectedLanguage, this.newWord)
            .pipe(filter((data:any) => data.ok ===1))
            .subscribe((success) =>  { this.generalSettings.UpddateRow({ id: this.newWord.id, propertyName: "id" }, rowData); });
          this.languageExpansionSettings.CollapseGrid({ id: rowData.id, propertyName: "id" });
        });
        resolve(component);
      });
    });
  }

  setUppageSettings() {
    this.pageSettings = new PageSettings(() => {
      this.onPageChange();
    });
  }

  onPageChange() {
    let pg = this.pageSettings.currentPage - 1;
    let pgS = this.pageSettings.pageSize;
    // http://localhost:3000/translations/dataTble/en?pg=${pg}&&pgS=${pgS}`
    this.translationsMDBService.getDataTableTranslations(this.selectedLanguage.language, pg, pgS).subscribe((data: Word[]) => {
      console.log(data);
      this.data.next(data)
    });
  }

  deleteTranslation(_id) {
    this.translationsMDBService.deleteTranslation(_id)
    .pipe(filter((data:any) => data.ok ===1))
    .subscribe(
      (data) => {
          this.generalSettings.DeleteRow({ id: _id, propertyName: "id" });
          this.pageSettings.setTotalRecords(this.totalRecords - 1);
          //Todo: refresh page number
      });
  }

  onLangChange(event) {
    const language = new Language();
    language.language = this.selectedProject;
    console.log(language);
    this.selectedLanguage = language;
    this.store.dispatch(new SelectLanguage(language));
    this.onPageChange();
  }

  AddLanguage() {
    this.router.navigate(['admin/adminAddnewLanguage']);
  }
  addNewWord() {
    if (this.selectedLanguage) {
      this.router.navigate(['admin/add-word/' + `${this.selectedLanguage.language}`]);
    }
  }


  getTranslationLanguages() {
    this.newWord.word = {};
    this.translationsMDBService.getTranslationLanguages().subscribe((data: any) => {
      // this.languages = data;
      data.forEach(data => { this.newWord['word'][data] = ''; });
      // passing data to wordLang service 
      // this will help us to avoid subscribing to API each time
      this.wordLang.changeWord(this.newWord);
    })
  }

  search() {
    console.log(this.searchedWord);
    this.translationsMDBService.searchWord(this.selectedLanguage, this.searchedWord).subscribe(
      data => { this.data.next(data) },
      err => { console.log(err); }
    );
    // Todo: update the table
  }

}