import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from './user';

export interface IAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://angular-update-af322-default-rtdb.firebaseio.com/';

  user = new Subject<User>();


  constructor(private http: HttpClient) {}

  postRecipe(data: any) {
    return this.http.post(`${this.baseUrl}recipes.json`, data)
  }

  getRecipes() {
    return this.http.get(`${this.baseUrl}recipes.json`)
  }

  signUp(data: any) {
    return this.http.post<IAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp`, data, {
      params: new HttpParams().append('key', environment.API_kEY)
    })
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      }));
  }

  signIn(data: any) {
    return this.http.post<IAuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword', data, {
      params: new HttpParams().append('key', environment.API_kEY)
    })
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      }))
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error.message) {
      return throwError(() => errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS' :
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND' :
        errorMessage = 'Email or password is incorrect'
        break;
      case 'INVALID_PASSWORD' :
        errorMessage = 'Email or password is incorrect'
    }
    return throwError(() => errorMessage)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + Number(expiresIn) * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }


}
