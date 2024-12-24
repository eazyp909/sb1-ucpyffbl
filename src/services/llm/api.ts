import { OLLAMA_CONFIG } from './config';
import type { LLMResponse } from './config';
import type { Recipe } from '../../types';

export class LLMError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LLMError';
  }
}

export async function queryOllama(prompt: string): Promise<LLMResponse> {
  try {
    const response = await fetch(`${OLLAMA_CONFIG.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_CONFIG.model,
        prompt,
        temperature: OLLAMA_CONFIG.temperature,
        max_tokens: OLLAMA_CONFIG.maxTokens,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new LLMError(`Failed to query Ollama: ${error.message}`);
  }
}

export async function parseRecipeResponse(response: string): Promise<Recipe> {
  try {
    const recipe = JSON.parse(response);
    
    // Validate required fields
    const requiredFields = ['title', 'ingredients', 'instructions', 'cookingTime', 'servings', 'difficulty'];
    for (const field of requiredFields) {
      if (!recipe[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return recipe;
  } catch (error) {
    throw new LLMError(`Failed to parse recipe response: ${error.message}`);
  }
}