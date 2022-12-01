import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService, IAuthResponse } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form!: FormGroup;
  isLogin = true;
  errorMessage = null;
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.switchForm();
  }

  switchMode() {
    this.isLogin = !this.isLogin;
    this.switchForm();
    this.form.reset();
  }

  loginSignUp(form: any) {
    form.value.returnSecureToken = true;
    let authObs: Observable<IAuthResponse>;

    if (form.valid && !this.isLogin) {
      this.isLoading = true;
      authObs = this.authService.signUp(form.value)
      this.form.reset();
    } else {
      this.isLoading = true;
      authObs = this.authService.signIn(form.value)
    }

    authObs.subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error;
        }
      })

  }

  dismissError() {
    this.errorMessage = null
  }

  switchForm() {
    if (this.isLogin) {
      this.form.controls['lastname'].disable()
      this.form.controls['firstname'].disable();
    } else {
      this.form.controls['lastname'].enable();
      this.form.controls['firstname'].enable();
    }
    this.form.updateValueAndValidity()
  }

}
