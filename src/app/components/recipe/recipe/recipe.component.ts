import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  data!: Recipe;
  imagePreview!: string;
  recipeList!: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.recipeService.fetchRecipe().subscribe((recipes) => {
      this.recipeList = recipes.map((recipeItem) => {
        const data = recipeItem.payload.doc.data() as Recipe;
        const id = recipeItem.payload.doc.id;
        return { id, ...data };
      });
    });
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
      if (res?.recipe_title) {
        this.recipeService
          .createRecipe(res)
          .then((data: any) => console.log(data));
      }
    });
  }

  onEdit(item: Recipe) {
    console.log(item);
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
      height: '100%',
      width: '660px',
      position: { right: '0px', top: '2px', bottom: '0px' },
      data: { ...item },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.recipeService.updateRecipe(res).then((data) => console.log(data));
      }
    });
  }

  onDelete(item: Recipe) {
    this.recipeService.deleteRecipe(item.id)
  }


}
