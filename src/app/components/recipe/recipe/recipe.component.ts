import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/types/recipe';
import { RecipeDialogComponent } from '../../recipe-dialog/recipe-dialog.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  isRecipe = true;
  editMode = false;
  recipeForm!: FormGroup;
  recipeData!: Recipe[];
  recipe!: Recipe;
  index!: string;
  imagePreview!: string;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onLoadRecipeDetail() {
    if (this.recipe && this.recipe.id) {
      this.recipeService.getRecipeById(this.recipe.id).subscribe((recipe) => {
        console.log(recipe);
      });
    }
  }

  openDialog() {
    let dialogRef: MatDialogRef<RecipeDialogComponent>;
    if (this.isRecipe) {
      dialogRef = this.dialog.open(RecipeDialogComponent, {
        height: '100%',
        width: '660px',
        position: { right: '0px', top: '2px', bottom: '0px' },
      });
    }
  }
}

// recipes: Recipe[];
// subscription: Subscription;

// constructor(private recipeService: RecipeService,
//             private router: Router,
//             private route: ActivatedRoute) {
// }

// ngOnInit() {
//   this.subscription = this.recipeService.recipesChanged
//     .subscribe(
//       (recipes: Recipe[]) => {
//         this.recipes = recipes;
//       }
//     );
//   this.recipes = this.recipeService.getRecipes();
// }

// onNewRecipe() {
//   this.router.navigate(['new'], {relativeTo: this.route});
// }

// ngOnDestroy() {
//   this.subscription.unsubscribe();
// }
