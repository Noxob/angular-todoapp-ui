import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private authService:AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = window.sessionStorage.getItem('token');
        if(token){
            request = request.clone({
                setHeaders: {
                  Authorization: 'Bearer ' + token
                }
              });
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const bearerToken = event.headers.get('Authorization');
                    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ' && event.status != 403) {
                        const jwt = bearerToken.slice(7, bearerToken.length);
                        window.sessionStorage.setItem("token", jwt);
                    }else{
                        this.authService.logout();
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                if(error.status == 403){
                    this.authService.logout();
                    return throwError(error);
                }
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                return throwError(error);
            })
        
        );
    }
 
}