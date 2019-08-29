import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }
  private createForm(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {
    if (this.signupForm.valid) {
      // Call the auth Service
      const { firstname, lastname, username, email, password } = this.signupForm.value;
      // console.log(`Name: ${firstname} ${lastname}, Username: ${username}, Email: ${email}, Password: ${password}`);
      this.subscriptions.push(
        this.authService.signup(firstname, lastname, username, email, password).subscribe(
          success => {
            if (success) {
              // console.log('actually success... ');
              this.router.navigate(['/chatrooms']);
            } else {
              const failedSignupAlert = new Alert('There was a problem signing up. Plz try again!', AlertType.Danger);
              this.alertService.alerts.next(failedSignupAlert);
            }
            this.loadingService.isLoading.next(false);
          }
        )
      );
    } else {
      const failedSignupAlert = new Alert('Please enter a valid email, username, name and password.', AlertType.Danger);
      this.alertService.alerts.next(failedSignupAlert);
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
