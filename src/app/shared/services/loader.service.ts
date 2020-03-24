import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { 
    HttpErrorResponse,
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor } from '@angular/common/http';
import { finalize, retry } from 'rxjs/operators';


@Injectable()
export class LoaderService {
    
    isSpinning = new BehaviorSubject(false);
    constructor() { }
}

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];


    constructor(public loaderService: LoaderService) { }

    moveToNextReq(request: HttpRequest<any>) {
        const i = this.requests.indexOf(request);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.requests.length > 0 ? this.loaderService.isSpinning.next(true) : this.loaderService.isSpinning.next(false);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(request);
        
        this.loaderService.isSpinning.next(true);

        return Observable.create(observer => {
            const subscription = next.handle(request).pipe(
            finalize(() => {
                this.moveToNextReq(request);
            })
            ).subscribe(
                result => {
                    if(result instanceof HttpResponse) 
                        {observer.next(result)}
                },
                error => {
                    observer.error(error); 
                },
                () => {
                    observer.complete();
                });
            return () => {
                this.moveToNextReq(request);
                subscription.unsubscribe();
            };
        });
    }
}