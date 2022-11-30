import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  form!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', Validators.required]
    })
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
}
