import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Alert } from './../classes/alert';
import { AlertType } from './../enums/alert-type.enum';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularFire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/Observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/Observable/fromPromise';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;
  public currentUserSnapshot: User | null;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    // Fetch the User from Firebase backend, then set user
    this.currentUser = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
    this.setCurrentUserSnapshot();
  }
  public signup(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string
  ): Observable<boolean> {
    // Call Firebase Signup function
    return Observable.fromPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
          const updatedUser = {
            id: user.user.uid,
            email: user.user.email,
            userName,
            firstName,
            lastName,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/lz-chatproject.appspot.com/o/default_profile_pic.png?alt=media&token=0a21e088-6a37-41df-a6ef-0831322a6d44',
            theme: 'default',
            quote: 'quote',
            bio: 'Biography'
          };
          // Actually update db
          userRef.set(updatedUser);
          return true;
        })
        .catch((err) => false)
    );
  }

  public login(
    email: string,
    password: string
  ) {
    // Call Firebase login function
    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => true)
        .catch((err) => false)
    );
  }

  public logout(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertService.alerts.next(new Alert('You have been signed out.'));
    });
  }

  private setCurrentUserSnapshot(): void {
    this.currentUser.subscribe(user => this.currentUserSnapshot = user);
  }
}
