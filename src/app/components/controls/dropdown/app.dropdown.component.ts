import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MapboxService } from 'src/app/moopla/services/mapbox.service';


@Component({
  selector: 'app-dropdown',
  templateUrl: './app.dropdown.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppDropdownComponent),
    multi: true
  }]
})
export class AppDropdownComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  constructor(private mapService: MapboxService) {}

  private innerValue: string = null;

  private dropdownReady$ = new BehaviorSubject<boolean>(false);

  private dropdownValue$ = new BehaviorSubject<string>(null);

  @ViewChild('dropdown', {static: true}) dropdownRef: ElementRef;

  @Input() Data: Observable<Array<any>>;
  placeholder: string;


  private onTouchedCallback: () => void = () => {
    console.log('touchtouchtouchtouchtouchtouch');
  };

  private onChangeCallback: (_: any) => void = (_: any) => {
    console.log('callBACK');
  };

  writeValue(obj: any): void {
    this.innerValue = obj;
    this.dropdownValue$.next(obj);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      jQuery(this.dropdownRef.nativeElement).addClass('disabled');
    } else {
      jQuery(this.dropdownRef.nativeElement).removeClass('disabled');
    }
  }

  ngOnInit(): void {
    combineLatest([this.dropdownReady$, this.dropdownValue$])
      .pipe(
        filter(comb => comb[0])
      )
      .subscribe(comb => {
        const [ready, value] = comb;
        if (value) {
          jQuery(this.dropdownRef.nativeElement).uiDropdown('set selected', value);
        }

        if (!value) {
          jQuery(this.dropdownRef.nativeElement).uiDropdown('clear');
        }
      });
  }

  ngAfterViewInit(): void {
    jQuery(this.dropdownRef.nativeElement)
      .uiDropdown({
        forceSelection: false,
        showOnFocus: true,
        useLabels: false,
        allowTab: true,
        fullTextSearch: true,
      //   fields: { name: "description", value: "data-value" },
      //   apiSettings: {
      //     mockResponse: {
      //         success: true,
      //         results: [
      //             {"description":"Opole","data-value":1},
      //             {"description":"Wrocław","data-value":2},
      //             {"description":"Warszawa","data-value":3},
      //             {"description":"Budapest","data-value":4},
      //             {"description":"Köln","data-value":5}
      //         ]
      //     }
      // },
        onChange: value => {
          console.log('ffffffffffffff');
          if (value !== this.innerValue) {
            this.innerValue = value;
            this.onChangeCallback(value);
          }
        },
        onListUpdate: _ => {
        
          if (this.innerValue !== jQuery(this.dropdownRef.nativeElement).uiDropdown('get value')) {
            jQuery(this.dropdownRef.nativeElement).uiDropdown('set selected', this.innerValue);
          }
        },
        onInit: _ => {
          
          if (this.innerValue) {
            jQuery(this.dropdownRef.nativeElement).uiDropdown('set selected', this.innerValue);
          }
          this.dropdownReady$.next(true);
        }
      });
  }

  mapSearch() {}
}

