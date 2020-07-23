import { Component, OnInit, Input, Output, forwardRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsComponent),
      multi: true
    }
  ]
})
export class ChipsComponent implements OnInit, ControlValueAccessor {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  onChange: any = () => {}
  onTouch: any = () => {}

  addOnBlur = false;
  input: any;
  inputCtrl = new FormControl();

  constructor() {
    debugger;
   }

  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  writeValue(input: string) {
    this.input = input;
  }

  ngOnInit(): void {
    debugger;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    let copiedInput= this.input;

    if (value) {
      copiedInput.push(+value);
    }
    if (input) {
      input.value = '';
    }
    this.inputCtrl.setValue(null);
    console.log(this.input);
  }

  remove(data: any): void {
    let copiedInput= this.input;

    const index = copiedInput.indexOf(data);

    if (index >= 0) {
      copiedInput.splice(index, 1);
    }
    console.log(this.input);
        
  }

  drop(event: CdkDragDrop<number[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.input = [...this.input];
}

}