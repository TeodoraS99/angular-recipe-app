import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-details-dialog',
  templateUrl: './recipe-details-dialog.component.html',
  styleUrls: ['./recipe-details-dialog.component.css'],
})
export class RecipeDetailsDialogComponent implements OnInit {
  isRecipe = true;
  imagePreview!: string;
  recipe: Recipe;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Recipe,
    private recipeService: RecipeService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.recipe = this.data;
  }
}
