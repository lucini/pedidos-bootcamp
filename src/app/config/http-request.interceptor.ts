import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = req.headers;
    auth.append('Authorization', '234234');
    const authReq = req.clone({
      headers: auth
    });

    console.log('PROTOCOLO:', req.method, 'URL:', req.url, req.headers.get('Authorization'));

    // req.headers.set('key', 'AKD65677');

    return next.handle(authReq);
  }

}
