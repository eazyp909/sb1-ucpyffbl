import { generateRecipePrompt } from './llm/prompts';
import { queryOllama, parseRecipeResponse, LLMError } from './llm/api';
import type { Ingredient, Recipe } from '../types';

export async function generateRecipe(ingredients: Ingredient[], dietaryRestrictions: string[]): Promise<Recipe> {
  try {
    const prompt = generateRecipePrompt(
      ingredients.map(i => i.name),
      dietaryRestrictions
    );

    const llmResponse = await queryOllama(prompt);
    return await parseRecipeResponse(llmResponse.response);
  } catch (error) {
    if (error instanceof LLMError) {
      console.error('LLM Error:', error);
      throw new Error('Failed to generate recipe. Please try again.');
    }
    throw error;
  }
}