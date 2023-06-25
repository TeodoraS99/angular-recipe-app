import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/types/recipe';
import { RecipeDialogComponent } from '../../recipe-dialog/recipe-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent  {
//variabile
  isRecipe = true;
  data!: Recipe;
  imagePreview!: string;
  recipeList!: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) {}

  //metoda care deschide dialogul
  openDialog() {
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
      height: '100%',
      width: '660px',
      position: { right: '0px', top: '2px', bottom: '0px' },
      data: {
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
  }
}
