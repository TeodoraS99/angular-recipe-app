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

  constructor(private db: AngularFirestore) {
    this.recipesRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Recipe> {
    return this.recipesRef;
  }

  getRecipe(): Observable<Recipe[]> {
    return this.recipesRef.valueChanges();
  }

  fetchRecipe() {
    return this.db.collection('Recipe').snapshotChanges();
  }

  createRecipe(recipe: Recipe): any {
    return this.recipesRef.add({ ...recipe });
  }

  // updateRecipe(id: string, data: any): Promise<void> {
  //   return this.recipesRef.doc(id).update(data);
  // }

  // updateRecipe(recipe: Recipe) {
  //   return this.recipesRef.collection('Recipe').doc(recipe.id).update(recipe);
  // }

  updateRecipe(recipe: Recipe): Promise<void> {
    const recipeId = recipe.id;
    delete recipe.id;
    return this.recipesRef.doc(recipeId).update(recipe);
    }

  deleteRecipe(id: string): Promise<void> {
    return this.recipesRef.doc(id).delete();
  }
}
