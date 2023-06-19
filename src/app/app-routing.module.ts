import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDialogComponent } from './components/recipe-dialog/recipe-dialog.component';
import { RecipeComponent } from './components/recipe/recipe/recipe.component';
import { RecipeDetailsDialogComponent } from './components/recipe-details-dialog/recipe-details-dialog.component';
import { HeaderComponent } from './components/header/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeComponent,
  },
  {
    path: '',
    component: RecipeDialogComponent,
  },
  {
    path: '',
    component: RecipeDetailsDialogComponent,
  },
  {
    path: '',
    component: HeaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
