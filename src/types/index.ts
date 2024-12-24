export interface Ingredient {
  name: string;
  quantity?: string;
}

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}