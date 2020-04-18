import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NewWord } from 'src/app/shared/models/newWord';

@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit {

  @Output() notify: EventEmitter<any> = new EventEmitter();

  newWord: NewWord =<any>{};

  constructor() { 
  }

  updateTranslations() {
    this.notify.emit();
  }

  ngOnInit() {
  }
  
}
