export interface Recipe {
  id?: string;
  recipe_title?: string;
  image?:ImageData;
  ingredients?: string;
  preparation?: string;
  complexity?: string;
  preparation_time?: string;
  baking_time?: string;
}
