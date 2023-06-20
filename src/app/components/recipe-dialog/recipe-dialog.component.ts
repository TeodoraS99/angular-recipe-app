import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { FilePath, Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css'],
})
export class RecipeDialogComponent implements OnInit {
  imagePreview!: string;
  path: FilePath;

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

  submit() {
    const filePath = this.path.name;
    const storageRef = this.angularFire.ref(filePath);
    const uploadTask = this.angularFire.upload(filePath, this.path);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL: any) => {
            console.log(downloadURL);
            if (this.data?.recipe_title) {
              this.recipeService
                .createRecipe({
                  ...this.data,
                  image:downloadURL
                })
                .then((data: any) => console.log(data));
            }
          });
        })
      )
      .subscribe();
  }
}
