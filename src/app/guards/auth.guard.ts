import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { Alert } from './../classes/alert';
import { AlertService } from './../services/alert.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertType } from './../enums/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.currentUser.pipe(
      take(1),
      map((currentUser) => !!currentUser),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.alertService.alerts.next(new Alert('Ypu must be logged in to acces this page.', AlertType.Danger));
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
      })
    );
  }
}
