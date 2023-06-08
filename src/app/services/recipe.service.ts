import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Recipe } from '../types/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  create(recipeObj: Recipe) {
    throw new Error('Method not implemented.');
  }
  // getRecipe() {
  //   throw new Error('Method not implemented.');
  // }
  private dbPath = '/recipe_title';
  private recipes: Recipe[] = [];
  recipesRef: AngularFirestoreCollection<Recipe>;

  constructor(private db: AngularFirestore) {
    this.recipesRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Recipe> {
    return this.recipesRef;
  }

  getRecipe(): Observable<Recipe[]> {
    return this.recipesRef.valueChanges();
  }

  getRecipeById(id: string): Observable<Recipe | undefined> {
    return this.recipesRef
      .valueChanges()
      .pipe(
        map((recipes: Recipe[]) =>
          recipes.find((recipe: Recipe) => recipe.id === id)
        )
      );
  }

  createRecipe(recipe: Recipe): any {
    return this.recipesRef.add({ ...recipe });
  }

  updateRecipe(id: string, data: any): Promise<void> {
    return this.recipesRef.doc(id).update(data);
  }

  deleteRecipe(id: string): Promise<void> {
    return this.recipesRef.doc(id).delete();
  }
}
