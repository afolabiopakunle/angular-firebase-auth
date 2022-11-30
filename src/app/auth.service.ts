import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

interface IAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://angular-update-af322-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  postRecipe(data: any) {
    return this.http.post(`${this.baseUrl}recipes.json`, data)
  }

  getRecipes() {
    return this.http.get(`${this.baseUrl}recipes.json`)
  }

  signUp(data: any) {
   return this.http.post<IAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp`, data, {
      params: new HttpParams().append('key', 'AIzaSyCX41Q575fg_yCG9HtUZyFuVmCw3vTUZqk')
    })
  }

}
