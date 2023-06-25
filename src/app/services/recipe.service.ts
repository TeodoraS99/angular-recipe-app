import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Recipe } from '../types/recipe';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private dbPath = '/Recipe';
  recipesRef: AngularFirestoreCollection<Recipe>;
  recipeList!: Recipe[];

  constructor(private db: AngularFirestore) {
    this.recipesRef = db.collection(this.dbPath);
  }
  fetchRecipe() {
    return this.db.collection('Recipe').snapshotChanges();
  }

  getRecipe(): Observable<Recipe[]> {
    return this.recipesRef.valueChanges();
  }

  createRecipe(recipe: Recipe): any {
    return this.recipesRef.add({ ...recipe });
  }

  updateRecipe(recipe: Recipe) {
    console.log('Update', recipe.id);
    return this.recipesRef.doc(recipe.id).update(recipe);
  }

  deleteRecipe(id: string): Promise<void> {
    return this.recipesRef.doc(id).delete();
  }
}
