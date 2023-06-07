import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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

  recipesRef!: AngularFirestoreCollection<Recipe>;

  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}
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
