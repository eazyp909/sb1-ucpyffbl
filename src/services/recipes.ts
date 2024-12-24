import { supabase } from '../lib/supabase';
import type { Recipe } from '../types';

export async function saveRecipe(recipe: Recipe, userId: string) {
  const { error } = await supabase
    .from('saved_recipes')
    .insert([
      {
        user_id: userId,
        title: recipe.title,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        cooking_time: recipe.cookingTime,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
      },
    ]);

  if (error) throw error;
}

export async function getSavedRecipes(userId: string) {
  const { data, error } = await supabase
    .from('saved_recipes')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}