import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

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
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  switchMode() {
    this.isLogin = !this.isLogin;
  }

  loginSignUp(form: any) {
    form.value.returnSecureToken = true;
    if (form.valid && !this.isLogin) {
      this.isLoading = true;
      this.authService.signUp(form.value)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error;
          }
        })
      this.form.reset();
    } else {
      this.isLoading = true;
      this.authService.signIn(form.value)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            console.log(response)
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error;
      }
        })
    }
  }

  dismissError() {
    this.errorMessage = null
  }

}
