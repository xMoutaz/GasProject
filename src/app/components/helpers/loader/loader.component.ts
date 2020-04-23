import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  
  constructor(private loaderService: LoaderService) { }
  isSpinning: BehaviorSubject<boolean> = this.loaderService.isSpinning;
  
  ngOnInit(): void {
  }

}
