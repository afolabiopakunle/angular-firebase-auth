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

  constructor(private fb: FormBuilder, private authService: AuthService) { }

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
    console.log(form.value)
    if(form.valid && !this.isLogin) {
      this.authService.signUp(form.value)
        .subscribe({
          next: (response) => {
            console.log(response)
          },
          error: (error) => {
            this.errorMessage = error.error.error.message;
      }
        })
      this.form.reset();
    }
  }

  dismissError() {
    this.errorMessage = null
  }

}
