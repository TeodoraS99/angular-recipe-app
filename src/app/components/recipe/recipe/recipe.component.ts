import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/types/recipe';
import { RecipeDialogComponent } from '../../recipe-dialog/recipe-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  data!: Recipe;
  index!: string;
  imagePreview!: string;
  // recipes: Recipe[];
   subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  )
  {}

  ngOnInit() {
    // this.subscription = this.recipeService.recipesChanged
    //   .subscribe(
    //     (recipes: Recipe[]) => {
    //       this.recipes
    //   );
    // this.recipes = this.recipeService.getRecipe();
  }

  onLoadRecipeDetail() {
    if (this.data && this.data.id) {
      this.recipeService.getRecipeById(this.data.id).subscribe((data) => {
        console.log(data);
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
      height: '100%',
      width: '660px',
      position: { right: '0px', top: '2px', bottom: '0px' },
      data: {
        id: '',
        recipe_title: 'Prajitura',
        image: '',
        ingredients: '- lapte, oua, faina',
        preparation:
          'Topiți untul. Separati albușurile de gălbenușuri. Mixați gălbenușurile cu zahărul până obțineți o cremă. Adăugați untul topit și răcit și amestecați. Cerneți făina și adăugați-o treptat. Turnați laptele și esența de vanilie și amestecați. Mixați albușurile cu sare până devin spumă. Incorporați spuma de albușuri în compoziție. Turnați în tavă și coaceți. Lăsați să se răcească și presărați zahăr pudră. Portionați și serviți.',
        complexity: 'low',
        preparation_time: '15 minute',
        baking_time: '1 ora',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res.recipe_title) {
        this.recipeService
          .createRecipe(res)
          .then((data: any) => console.log(data));
      }
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
