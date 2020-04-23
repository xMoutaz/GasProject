import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { MessageStatus } from './messageStatus';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  
  messageStatus$: Observable<MessageStatus>;
  
  @Input() Module?: string;


  constructor(private statusMessageService: MessageService) { 
    this.messageStatus$ = statusMessageService.GetStatusSubject(this.Module);
  }
  
  ngOnInit(): void {
  }

  onClose(){
    this.statusMessageService.ClearMessage();
  }
}
