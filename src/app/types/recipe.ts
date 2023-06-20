export interface Recipe {
  id?: any;
  recipe_title?: string;
  image?: File;
  ingredients?: any;
  preparation?: any;
  complexity?: string;
  preparation_time?: any;
  baking_time?: any;
}

export interface FilePath{
  name: string;
}
