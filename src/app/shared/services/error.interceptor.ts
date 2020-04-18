import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageStatus, MessageType } from 'src/app/components/controls/message/messageStatus';
import { MessageService } from './message.service';

@Injectable()

export class ErrorIntercept implements HttpInterceptor {
    constructor(private statusMessageService: MessageService, private  translate: TranslateService) {
    }
  
    intercept(request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
      let subscription = next.handle(request)
      .pipe(
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
