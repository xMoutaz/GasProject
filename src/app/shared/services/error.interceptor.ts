import { HttpInterceptor, 
    HttpRequest, 
    HttpHandler, 
    HttpEvent, 
    HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from './message.service';
import { MessageStatus, MessageType } from 'src/app/components/controls/message/messageStatus';
import { Injectable } from '@angular/core';

@Injectable()

export class ErrorIntercept implements HttpInterceptor {
    constructor(
        private statusMessageService: MessageService,
        private  translate: TranslateService) {
    }
  
    intercept(request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
     
      let subscription = next.handle(request)
      .pipe(
          retry(1),
          catchError((response, obs) => {
        if (response instanceof HttpErrorResponse) {
          if ([500, 404, 403, 0].indexOf(response.status) != -1 ) {
            let errorCode = ""
             if(response.error && response.error.error){
              errorCode = response.error.error.code;
            }
            const transSub = this.translate.get(["unexpectedServerError", "errorReferenceCodeExplanation"]).subscribe((trans) => {
              this.statusMessageService.SetMessage(new MessageStatus(MessageType.Error, "", [trans.unexpectedServerError + ": " + response.status,
                trans.errorReferenceCodeExplanation + " " + errorCode]));
            });
            transSub.unsubscribe();
            return EMPTY;
          } else {
            this.statusMessageService.ClearMessage();
          }
        }
        return throwError(response);
      }));
      return subscription;
    }
  }
