import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IRecipe } from '../recipe';
import { map } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  form!: FormGroup;
  recipes: IRecipe[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', Validators.required]
    })

    this.getRecipes();

  }

  submit() {
    this.authService.postRecipe(this.form.value)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.form.reset()
        }
      })
  }

  getRecipes() {
    this.authService.getRecipes()
      .pipe(map((recipeData: any) => {
        const recipeArray = [];
        for(const key in recipeData) {
          recipeArray.push({...recipeData[key as keyof IRecipe], id: key})
        }
        return recipeArray;
      }))
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes;
        }
      })
  }
}
