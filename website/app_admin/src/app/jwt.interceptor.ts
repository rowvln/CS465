import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Authentication } from './services/authentication';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: Authentication) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.getToken();

    // Do not attach token to login/register
    if (!token || req.url.includes('/api/login') || req.url.includes('/api/register')) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next.handle(authReq);
  }
}