import { Component, OnInit } from '@angular/core';
import { GPFIButton, ColumnDefs } from 'src/app/components/controls/data-table/classes/Columns';
import { MarriageBanditService } from '../../services/marriageBandits.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-view-offenders',
  templateUrl: './view-offenders.component.html',
  styleUrls: ['./view-offenders.component.css']
})
export class ViewOffendersComponent implements OnInit {

  data = new BehaviorSubject<Array<any>>([]);
  colDefinitions: Array<ColumnDefs>;

  constructor(private banditService: MarriageBanditService) {
    this.setUpColumnDefintion();
   }

  ngOnInit(): void {
    this.banditService.getOffenders().subscribe(claims => {
      this.data.next(claims);
    });
  }

  setUpColumnDefintion() {
    this.colDefinitions = [
      {
        key: 'firstName',
        className: 'data_grid_left_align',
        header: 'First Name'
      },
      {
        key: 'lastName',
        className: 'data_grid_left_align',
        header: 'Last Name',
        responsivePriority: true
      },
      {
        key: 'alsoKnownAs',
        className: 'data_grid_center_align',
        header: 'alsoKnownAs',
        responsivePriority: true
      },
      {
        key: 'address',
        className: 'data_grid_left_align',
        header: 'Adress',
        responsivePriority: true
      },
      {
        key: 'dateOfBirth',
        className: 'data_grid_center_align',
        header: 'dateOfBirth',
        responsivePriority: true
      },
      {
        key: 'description',
        className: 'data_grid_center_align',
        header: 'description'
      },
      {
        key: 'masjid',
        className: 'data_grid_center_align',
        header: 'masjid'
      },
      {
        cellElement: (cellData, rowData, row) => {
          return new GPFIButton('view',()=>{

          });
        }, className: 'data_grid_center_align', responsivePriority: true
      }
    ];
  }

}
