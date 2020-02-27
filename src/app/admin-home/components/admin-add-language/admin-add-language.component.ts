import { Component, OnInit, OnDestroy, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ColumnDefs, GPFIButton } from '../../../components/data-table/classes/Columns';
import { map } from 'rxjs/operators';
import { ActionMenuComponent, ActionButton } from '../../../components/action-menu/action-menu.component';
import { Router } from '@angular/router';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { Word } from 'src/app/shared/models/wordTrans';
import { AdminDataService } from '../../services/admin-data.service';
import { ExpansionSettings } from 'src/app/components/data-table/classes/Expansion';
import { EditWordComponent } from '../edit-word/edit-word.component';
import { PageSettings } from 'src/app/components/data-table/classes/Paging';
import { GeneralSettings, GeneralSettingsHelper } from 'src/app/components/data-table/classes/General';
import { ThrowStmt } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-add-language',
  templateUrl: './admin-add-language.component.html',
  styleUrls: ['./admin-add-language.component.css']
})
export class AdminAddLanguageComponent implements OnInit, OnDestroy {
  word= new Word();

  data = new BehaviorSubject<Array<any>>([]);
  colDefinitions: Array<ColumnDefs>;
  selectedLanguage: string;

  // for paging data
  dataList: any;

  subscription: Subscription;

  totalRecords : number;

  languages: Array<any>;

  languageExpansionSettings: ExpansionSettings;
  pageSettings: PageSettings;
  generalSettings: GeneralSettings;
  tableSettings: DataTables.Settings;
  showMessage: string;
  testArray: Word[] = [];

  pageSize: number = 2;

  startingPoint: string = '';
  endingPiont: string;

  private _url: string ='https://us-central1-gasproject-2f4cb.cloudfunctions.net/webApi/api/v1/test';


  constructor(
    private http: HttpClient,
    public CFR: ComponentFactoryResolver,
    private translationServices: TranslationsService, 
    private router: Router, 
    private adminUser: AdminDataService) {          
    this.setUpColumnDefintion();
    this.getTransLanguages();
    this.languageExpansionSettings = this.setupExpansionSettings();
    this.setUppageSettings();  
  }

  ngOnInit() {
  }

  ngOnDestroy() {
}

  getTranslations() {
   this.subscription = this.translationServices.getTrans(this.selectedLanguage)
    .snapshotChanges().pipe(
      map(changes =>
        changes.map(c  =>
          ({ key: c.payload.key, ...c.payload })))
    ).subscribe(data => {
      this.data.next(data);
    });
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key:'key',
        className: 'data_grid_left_align',
        header: "Word",
        responsivePriority:true
      },
      {
        key:'value',
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

  generateActionMenuForRfr(cellData, rowData, row) {
    let menu = new ActionMenuComponent();

    let deleteButton = new ActionButton();
    deleteButton.label = "delete";
    deleteButton.data = rowData;
    deleteButton.action = (data => {
      this.deleteTranslation(data)
    });
    let editLanguage = new ActionButton();
    editLanguage.label = "editLanguage";
    editLanguage.data = rowData;
    editLanguage.action = (data => {
      this.languageExpansionSettings.ExpandGrid({id: rowData.key, propertyName: "key"})
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
        component.instance.word.word= rowData.key;
        component.instance.word.trans= rowData.node_.value_;
        this.word = component.instance.word;
        component.instance.notify.subscribe(event => 
          { console.log(this.word);
            this.translationServices.updateArTrans(this.selectedLanguage , this.word); 
            this.languageExpansionSettings.CollapseGrid({id:rowData.key, propertyName:"key"});
           })
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
    console.log('total Records: ' + this.totalRecords);
    
    console.log(this.pageSettings.getTotalRecords());
    console.log(this.pageSettings.currentPage);
    // pg=0&pgS=5
    let pg = this.pageSettings.currentPage-1;
    let pgS = this.pageSettings.pageSize;
    console.log('pg: ' +pg);
    console.log('pgS: ' +pgS);
    
    this.http.get(`http://localhost:4201/translations?pg=${pg}&&pgS=${pgS}`)
    .subscribe(data => {
      let temp : any = data;
      this.data.next(temp)
    })  
  }

    // number of child
    getNumChildren(selectedLanguage): any {
      this.translationServices.getNumChildren('ar')
      .subscribe(data =>{
       this.totalRecords =  data.payload.numChildren();
       console.log(this.totalRecords);
       this.pageSettings.setTotalRecords(this.totalRecords);       
      })
      this.onPageChange();
    }

  deleteTranslation(data) {
     this.translationServices.deleteTranslation(data);
  }

  onLangChange(event) {
    this.selectedLanguage = event.target.value;   
    this.adminUser.changeTargetedLnaguage(this.selectedLanguage);  
    this.getNumChildren(this.selectedLanguage);
  }

  AddLanguage() {
    this.router.navigate(['admin/adminAddnewLanguage']);      
  }
  addNewWord() {
    this.router.navigate(['admin/add-word'])
  }
  
  getTransLanguages() {
  this.translationServices.getLang()
    .snapshotChanges()
    .pipe(map(changes =>
      changes.map(c  =>
        ({ key: c.payload.key})))
  ).subscribe(data => {
      this.languages = data;
    });
  }



}