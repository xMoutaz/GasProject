import { Component, OnInit, OnDestroy, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subscription, Observable, Subject } from 'rxjs';
import { ColumnDefs, GPFIButton } from '../../../components/controls/data-table/classes/Columns';
import { map } from 'rxjs/operators';
import { ActionMenuComponent, ActionButton } from '../../../components/controls/action-menu/action-menu.component';
import { Router } from '@angular/router';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { Word } from 'src/app/shared/models/wordTrans';
import { AdminDataService } from '../../services/admin-data.service';
import { ThrowStmt } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { TranslationsMdbService } from 'src/app/shared/services/Mongodb/translations-mdb.service';
import { NewWord } from 'src/app/shared/models/newWord';
import { ExpansionSettings } from 'src/app/components/controls/data-table/classes/Expansion';
import { PageSettings, PagingHelper } from 'src/app/components/controls/data-table/classes/Paging';
import { GeneralSettings } from 'src/app/components/controls/data-table/classes/General';
import { EditWordComponent } from '../edit-word/edit-word.component';
import { LanguagesService } from 'src/app/shared/services/languages.service';

@Component({
  selector: 'app-admin-add-language',
  templateUrl: './admin-add-language.component.html',
  styleUrls: ['./admin-add-language.component.css']
})
export class AdminAddLanguageComponent implements OnInit, OnDestroy {

  data = new BehaviorSubject<Array<any>>([]);
  colDefinitions: Array<ColumnDefs>;
  selectedLanguage: string ='en';

  // for paging data
  dataList: any;

  totalRecords : number;

  languages: any;

  languageExpansionSettings: ExpansionSettings;
  pageSettings: PageSettings;
  generalSettings= new GeneralSettings();
  
  newWord: NewWord =<any>{};
  
  constructor(
    private wordLang: LanguagesService,
    private translationsMDBService: TranslationsMdbService,
    public CFR: ComponentFactoryResolver,
    private router: Router)
     { 
      this.getTotalRecord();   
      this.getTranslationLanguages();   
      this.setUpColumnDefintion();
      this.languageExpansionSettings = this.setupExpansionSettings();
      this.setUppageSettings();  
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key:'id',
        className: 'data_grid_left_align',
        header: "Word",
        responsivePriority:true
      },
      {
        key:'trans',
        className: 'data_grid_center_align',
        header: "trans",
        responsivePriority:true
      },
    {  cellElement: (cellData, rowData, row) => {
      return this.generateActionMenuForRfr(cellData, rowData, row);
    }, className: 'data_grid_center_align', responsivePriority:true
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
      this.languageExpansionSettings.ExpandGrid({id: rowData.id, propertyName: "id"})
    });
    menu.buttons.push( deleteButton, editLanguage);
    return menu;
  };

  setupExpansionSettings() {
    return new ExpansionSettings(false, (viewContainerRef, rowData, row) => {
      return new Promise<any>((resolve) => {
        const componentResolve = 
        this.CFR.resolveComponentFactory(EditWordComponent);
        // Data table returns its own view container, so it can manage the removing of its instance on collapse of the grid
        // to prevent memory leaks.
        let component = viewContainerRef.createComponent(componentResolve);
        component.instance.newWord = rowData;

        // component.instance.newWord.id= rowData.id;
        // component.instance.newWord.trans= rowData.word;
        
        this.newWord = component.instance.newWord;        
           component.instance.notify.subscribe(event => 
          { 
            rowData.id = this.newWord.id;
            rowData.word = this.newWord.trans;
                        
            this.translationsMDBService.updateTranslation(this.selectedLanguage, this.newWord)
              .subscribe((data: any)=>{
                if(data.ok === 1) {this.generalSettings.UpddateRow({id:this.newWord.id, propertyName:"id"}, rowData);}
                else return;
              });
              // this.translationServices.updateArTrans(this.selectedLanguage , this.word); 
              this.languageExpansionSettings.CollapseGrid({id:rowData.id, propertyName:"id"});
            });
        resolve(component);
      });
    });
  }

  setUppageSettings() {
    this.pageSettings =  new PageSettings(() => {
      this.onPageChange();
    });
  }
    
  onPageChange() {
      let pg = this.pageSettings.currentPage-1;
      let pgS = this.pageSettings.pageSize;
      // http://localhost:3000/translations/dataTble/en?pg=${pg}&&pgS=${pgS}`
      this.translationsMDBService.getDataTableTranslations(this.selectedLanguage, pg, pgS).subscribe((data: Word[]) => 
        this.data.next(data));
  }

  deleteTranslation(_id) {
    //  this.translationServices.deleteTranslation(data);
    this.translationsMDBService.deleteTranslation(_id).subscribe(
      (data: any) => {
        if (data.ok === 1) {
          this.generalSettings.DeleteRow({id:_id,propertyName: "id" });
          this.pageSettings.setTotalRecords(this.totalRecords-1);
          // refresh page number
        } else return;
    });
  }

  onLangChange(event) {    
     this.selectedLanguage =  event.target.value;  
     this.onPageChange();
  }

  AddLanguage() {
    this.router.navigate(['admin/adminAddnewLanguage']);      
  }
  addNewWord() {    
    if(this.selectedLanguage){
    this.router.navigate(['admin/add-word/'+`${this.selectedLanguage}`]);
    }
  }


  getTranslationLanguages() {
    this.newWord.word={};
    this.translationsMDBService.getTranslationLanguages().subscribe((data: any) => {
      this.languages = data;
      data.forEach(data => {this.newWord['word'][data]=  '';});
    // passing data to wordLang service 
    // this will help us to avoid subscribing to API each time
    this.wordLang.changeWord(this.newWord);
   })
  }
  
  }