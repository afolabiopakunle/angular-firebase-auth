import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

}
