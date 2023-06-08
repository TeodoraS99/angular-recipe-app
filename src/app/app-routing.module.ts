import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDialogComponent } from './components/recipe-dialog/recipe-dialog.component';
import { RecipeComponent } from './components/recipe/recipe/recipe.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeComponent,
  },
  {
    path: '',
    component: RecipeDialogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
