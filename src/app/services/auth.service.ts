import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { Alert } from './../classes/alert';
import { AlertType } from './../enums/alert-type.enum';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';
import 'rxjs/add/Observable/of';
import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {
    // TODO Fetch the User from Firebase backend, then set user
    this.currentUser = Observable.of(null);
  }
  public signup(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string
  ): Observable<boolean> {
    // TODO Call Firebase Signup function
    return Observable.of(true);
  }

  public login(
    email: string,
    password: string
  ) {
    // TODO Call Firebase login function
    return Observable.of(true);
  }

  public logout(): void {
    // TODO Call firebase logout function
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('You have been signed out.'));
  }
}
