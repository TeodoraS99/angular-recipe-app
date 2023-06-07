import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  isRecipe = true;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(public dialog: MatDialog) {}
  openDialog() {
    let dialogRef: MatDialogRef<any>;
    if (this.isRecipe) {
      dialogRef = this.dialog.open(RecipeDialogComponent, {
        height: '100%',
        width: '660px',
        position: { right: '0px', top: '2px', bottom: '0px' },
      });
    }
  }
}

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
})
export class RecipeDialogComponent implements OnInit {
  isRecipe = true;
  recipeForm!: FormGroup;

  recipeObj: Recipe = {
    id: '',
    recipe_title: '',
    ingriedents: '',
    preparation: '',
    complexity: '',
    preparation_time: '',
    baking_time: '',
  };

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      ingriedents: ['', Validators.required],
      preparation: ['', Validators.required],
      complexity: ['', Validators.required],
      preparationTime: ['', Validators.required],
      bakingTime: ['', Validators.required],
    });
  }

  ngOnInit() {}

  addRecipe() {
    const { value } = this.recipeForm;
    console.log(value);
    (this.recipeObj.id = ''),
      (this.recipeObj.recipe_title = value.title),
      (this.recipeObj.ingriedents = value.ingriedents),
      (this.recipeObj.preparation = value.preparation),
      (this.recipeObj.complexity = value.complexity),
      (this.recipeObj.preparation_time = value.preparationTime),
      (this.recipeObj.baking_time = value.bakingTime);

    this.recipeService.addRecipe(this.recipeObj).then((recipe) => {
      if (recipe) {
        alert('Recipe Added Successfully!');
      }
    }).catch;
  }

  onSubmit() {}
}
