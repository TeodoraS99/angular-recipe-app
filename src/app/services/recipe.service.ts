import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recipe } from '../types/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public fs!: Firestore;

  constructor() {}
  //Add new Recipe code here
  addRecipe(recipe: Recipe) {
    recipe.id = doc(collection(this.fs, 'id')).id;
    return addDoc(collection(this.fs, 'Recipe'), recipe);
  }

  //get all recipes from database
  getRecipes(): Observable<Recipe[]> {
    let recipesRef = collection(this.fs, 'Recipe');
    return collectionData(recipesRef, { idField: 'id' }) as Observable<
      Recipe[]
    >;
  }

  //delete all recipes from database
  deleteRecipe(recipe: Recipe) {
    let docRef = doc(collection(this.fs, `Recipe'/${recipe.id}`));
    return deleteDoc(docRef);
  }

  //update recipes from database
  updateRecipe(recipe: Recipe, recipes: any) {
    let docRef = doc(collection(this.fs, `Recipe'/${recipe.id}`));
    return updateDoc(docRef, recipes);
  }


}
