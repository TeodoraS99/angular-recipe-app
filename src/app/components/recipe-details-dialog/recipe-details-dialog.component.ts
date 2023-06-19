import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-details-dialog',
  templateUrl: './recipe-details-dialog.component.html',
  styleUrls: ['./recipe-details-dialog.component.css']
})
export class RecipeDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Recipe) {}

}
