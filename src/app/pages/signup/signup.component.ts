import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder, private AlertService: AlertService) {
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
      // TODO Call the auth Service
      const { firstname, lastname, username, email, password } = this.signupForm.value;
      console.log(`Name: ${firstname} ${lastname}, Username: ${username}, Email: ${email}, Password: ${password}`);
    } else {
      const failedSignupAlert = new Alert('Please enter a valid email, username, name and password.', AlertType.Danger);
      this.AlertService.alerts.next(failedSignupAlert);
    }
  }
}
