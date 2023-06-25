import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/types/recipe';
import { RecipeDetailsDialogComponent } from '../../recipe-details-dialog/recipe-details-dialog.component';
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

  //este apelată funcția fetchRecipe() a serviciului RecipeService pentru a obține lista de rețete
  //apoi lista este procesată și asignată variabilei recipeList din componentă.
  ngOnInit(): void {
    this.recipeService.fetchRecipe().subscribe((recipes) => {
      this.recipeList = recipes.map((recipeItem) => {
        const data = recipeItem.payload.doc.data() as Recipe;
        const id = recipeItem.payload.doc.id;
        data.id = id;
        return { ...data };
      });
    });
  }

  updateRecipe(item: Recipe) {
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
      height: '100%',
      width: '660px',
      position: { right: '0px', top: '2px', bottom: '0px' },
      data: { ...item },
    });
    // După închiderea dialogului, prin abonarea la evenimentul afterClosed(),
    //se primește rezultatul și se utilizează serviciul RecipeService pentru a actualiza rețeta în baza de date.
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.recipeService.updateRecipe(res).then((data) => console.log(data));
      }
    });
  }

  //metoda care sterge reteta
  deleteRecipe(item: Recipe) {
    this.recipeService.deleteRecipe(item.id);
  }

  //deschide dialog cu detalii
  openDetailsRecipe(item: Recipe) {
    const dialogRef = this.dialog.open(RecipeDetailsDialogComponent, {
      height: '100%',
      width: '700px',
      position: { right: '0px', top: '2px', bottom: '0px' },
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
