import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css'],
})
export class RecipeDialogComponent implements OnInit {
  imagePreview!: string;
  path: String;

  constructor(
    private angularFire: AngularFireStorage,
    private recipeService: RecipeService,
    private dialogRef: MatDialogRef<RecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipe
  ) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }

  upload($event: any) {
    this.path = $event.target.files[0];
  }

  uploadImage() {
    console.log(this.path);
    this.angularFire.upload('/files', this.path);
  }
}
