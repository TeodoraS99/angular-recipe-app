import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css'],
})
export class RecipeDialogComponent implements OnInit {
  editMode = false;
  recipeForm!: FormGroup;
  recipeData!: Recipe[];
  recipe!: Recipe;
  index!: string;
  imagePreview!: string;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    @Inject(MAT_DIALOG_DATA) public passedData: { id: string }
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      ingredients: ['', Validators.required],
      preparation: ['', Validators.required],
      complexity: ['', Validators.required],
      preparationTime: ['', Validators.required],
      bakingTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllRecipes();
    const id = this.passedData.id;
    if (id) {
      this.index = id;
      this.editMode = true;
      this.recipeService
        .getRecipeById(id)
        .subscribe((recipe: Recipe | undefined) => {
          if (recipe) {
            this.recipe = recipe;
            this.initForm();
          }
        });
    } else {
      this.initForm();
    }
  }

  initForm() {
    let recipeTitle = this.editMode ? this.recipe.recipe_title : '';
    let image = this.editMode ? this.recipe.image : '';
    let ingredients = this.editMode ? this.recipe.ingredients : '';
    let preparation = this.editMode ? this.recipe.preparation : '';
    let complexity = this.editMode ? this.recipe.complexity : '';
    let preparation_time = this.editMode ? this.recipe.preparation_time : '';
    let baking_time = this.editMode ? this.recipe.baking_time : '';

    this.recipeForm = new FormGroup({
      title: new FormControl(recipeTitle, Validators.required),
      image: new FormControl(image, Validators.required),
      ingredients: new FormControl(ingredients, Validators.required),
      preparation: new FormControl(preparation, Validators.required),
      complexity: new FormControl(complexity, Validators.required),
      preparationTime: new FormControl(preparation_time, Validators.required),
      bakingTime: new FormControl(baking_time, Validators.required),
    });
  }

  create() {
    const recipeObj: Recipe = {
      ...this.recipeForm.value,
    };

    this.recipeService
      .createRecipe(recipeObj)
      .then((docRef: any) => {
        alert('Recipe Added Successfully!');
        this.recipeForm.reset();
        this.getAllRecipes(); // actualizeaza lista de retete
      })
      .catch((error: any) => {
        console.error('Error creating recipe:', error);
      });
  }

  getAllRecipes(): void {
    {
      this.recipeService.getRecipe().subscribe((recipeList: Recipe[]) => {
        console.log(recipeList);
        this.recipeData = recipeList;
      });
    }
  }

  onImagePicked(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const formData = new FormData();
      formData.append('image', file);
      this.recipeForm.patchValue({ image: formData });
      this.recipeForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService
        .updateRecipe(this.index, this.recipeForm.value)
        .then(() => {
          console.log('Recipe updated successfully!');
          this.onCancel();
        })
        .catch((error: any) => {
          console.error('Error updating recipe:', error);
        });
    } else {
      this.recipeService
        .createRecipe(this.recipeForm.value)
        .then(() => {
          console.log('Recipe created successfully!');
          this.onCancel();
        })
        .catch((error: any) => {
          console.error('Error creating recipe:', error);
        });
    }
  }

  onCancel() {
    this.recipeForm.reset();
    this.editMode = false;
    this.imagePreview = '';
  }
}
